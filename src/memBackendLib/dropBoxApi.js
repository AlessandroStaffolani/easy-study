/*@flow*/
import {parseQueryString,later} from '../utils.js'
var DropboxApi= require('dropbox');
const retryTimes=3;

type cardToStore=
{
  contents:string;
  name:string;
}
type cardFromStore=
{
  content:string;
  hash:sring;
}
const CLIENT_ID = 'amzqeu333ykv7ct';

const invert  = (p)  => new Promise((res, rej) => p.then(rej, res));
const firstOf = (ps) => invert(Promise.all(ps.map(invert)));

function getAccessTokenFromUrl():string
{
 return parseQueryString(window.location.hash).access_token;
}

function getAccess()
{
 var dbx = new DropboxApi({ clientId: CLIENT_ID });
 var authUrl = dbx.getAuthenticationUrl('http://localhost:5000');
 return authUrl;
}

function reader (file)
 {
  return new Promise(function (resolve, reject)
  {
   let reader = new FileReader();
   reader.onload = function ()
   {
    resolve(reader);
   };
   reader.onerror = reject;
   reader.readAsText(file);
  });
}

let dropbox= function()
{
  let dbx="undeifined";

  function init(token:string)
  {
    dbx= new DropboxApi({ accessToken: token});
  }

  function getCardFromStore(name:string):Promise<cardFromStore>
  {
      let nameFile= name+".txt";
      let promiseFile:Promise<File>=dbx.filesDownload({path: '/' + nameFile});
      let promiseReader=promiseFile.then(file=>reader(file.fileBlob));
      return Promise.all([promiseReader,promiseFile]).then(([contentfile,metadatadata])=>
        {
          let content=contentfile.result,
              hash=metadatadata.content_hash;
          return {content,hash};
        })
  }

  function listAllFiles()
  {
    let listFilePromise= dbx.filesListFolder({path: ''});
    return listFilePromise.then(files=>
      files.entries.map(file=>
        {
          let name=file.name,
              hash=file.content_hash;
          return {name,hash};
        }));
  }

  function waiter(cursor,timeout=30,callback)
  {
    let wait=dbx.filesListFolderLongpoll({cursor,timeout})
    wait.then(result=>
      {
        if (result.changes==false)
          waiter(cursor,timeout);
        else
        {
          let fcontinue=dbx.filesListFolderContinue({cursor});
          fcontinue.then(res=>res.entries.map(fileChanged=>
            callback(fileChanged.name,fileChanged.content_hash)));
          fcontinue.then(list=>waiter(list.cursor,30,callback));
        }
      });
  }

  function setUpdater(callback)
  {
    let cursor=dbx.filesListFolderGetLatestCursor({path: ''});
    let poll=cursor.then(lf=>waiter(lf.cursor,30,callback));
  }

  function retryWrite(file,mode,callback,times=2)
  {
    if(times>0)
    {
      let dbxWrite=later(1000*2).then(()=>
        dbx.filesUpload({path: '/' + file.name, contents: file,mode}));
      dbxWrite.then(callback,()=>retryWrite(file, mode, callback, times-1));
    }
  }

  function createNewCardOnStore(card:cardToStore,mode="add")
  {
    let nameFile= card.name+".txt";
    let file = new File([card.contents], nameFile,{type: "text/plain",});
    return new Promise(function(resolve,reject)
    {
      let fileUpload= dbx.filesUpload({path: '/' + file.name, contents: file,mode});
      fileUpload.then(resolve,()=>retryWrite(file, mode,resolve));
    });
  }

  function modifyCardOnStore(card:cardToStore)
  {
    return createNewCardOnStore(card, "overwrite");
  }

  function isInitiated():Promise<boolean>
  {
    if( dbx==null) return Promise.resolve(false);
    var listFilePromise= dbx.filesListFolder({path: ''});
    return listFilePromise.then(files=>
      files.entries.filter(file=>file.name=="init.txt").length==1);
  }

  function deleteCard(card:string)
  {
    let fileName=card+".txt";
    return dbx.filesDelete({path:"/"+fileName});
  }

return {init,deleteCard,isInitiated,modifyCardOnStore,createNewCardOnStore,getCardFromStore,listAllFiles,setUpdater}
};

let exports = dropbox();
exports['getAccess']=getAccess;

let init=exports.init,
    listAllFiles=exports.listAllFiles,
    deleteCard=exports.deleteCard,
    isInitiated=exports.isInitiated,
    modifyCardOnStore=exports.modifyCardOnStore,
    createNewCardOnStore=exports.createNewCardOnStore,
    getCardFromStore=exports.getCardFromStore;

export default exports;
export {init,deleteCard,isInitiated,modifyCardOnStore,createNewCardOnStore,getCardFromStore,getAccess,getAccessTokenFromUrl};
