/*@flow*/
import {parseQueryString} from '../utils.js';
import dbx from './dropBoxApi';
import {getCacheFile,removeFile,cacheFile,invalidate,check,clean} from './cacher.js';

function setRequestForLocalStorage(api:string):void
{
  sessionStorage.setItem("masterAPI", api);
}

function getToken()
{
  if(localStorage.getItem("masterToken")!==null)
  {
    return localStorage.getItem("masterToken");
  }
  else if(setToken())
  {
    return localStorage.getItem("masterToken");
  }
  else
  {
    return undefined;
  }
}

function init():boolean
{
  let token=getToken();
  if(token===undefined) return false;

  switch (localStorage.getItem("masterAPI"))
  {
    case "Dropbox":
      dbx.init(token);
      memBossInst.setMem();
      return true;
    default:
    return false;
  }
}

function getAccess()
{
  switch (sessionStorage.getItem("masterAPI"))
  {
    case "Dropbox":
      return dbx.getAccess();
    default:
    return false;
  }
}

function getAccessTokenFromUrl()
{
  return parseQueryString(window.location.hash).access_token;
}

function setToken()
{
  let api=sessionStorage.getItem("masterAPI");
  let token=getAccessTokenFromUrl();
  if(token!==undefined)
  {
      console.log("ciao")
    switch (api)
    {
      case "Dropbox":
        localStorage.setItem("masterToken", getAccessTokenFromUrl());
        localStorage.setItem("masterAPI", "Dropbox");
          console.log("ciao")
        return true;
      default:
        return false;
    }
  }
  return false;
}//setToken

class memBoss
{
  listeners=[];

  constructor()
  {
    this.isReady=this.isReady.bind(this);
    this.createNewCardOnStore=this.createNewCardOnStore.bind(this);
    this.removeCard=this.removeCard.bind(this);
    this.setMem=this.setMem.bind(this);
    this.modifyCardOnStore=this.modifyCardOnStore.bind(this);
    this.getCardFromStore=this.getCardFromStore.bind(this);
    this.onBackendChange=this.onBackendChange.bind(this);
  }

  onBackendChange(name:string,hash:string)
  {
    check(name, hash);
    this.listeners.map((func,index)=>
      {
        try
        {
          func(name,hash)
        } catch (e)
        {
          console.log(e)
        }

      });
  }

  setMem()
  {
    switch (localStorage.getItem("masterAPI"))
    {
      case "Dropbox":
        this.mem=dbx;
        this.mem.setUpdater(this.onBackendChange)
        return true;
      default:
      return false;
    }
  }

  isReady():Promise<boolean>
  {
    if(this.mem==null) return Promise.resolve(false);
    let allFiles:Promise<Array<Object>>=this.mem.listAllFiles();

    allFiles.then(files=>
      files.map(file=>check(file.name,file.hash)));

      allFiles.then(files=>clean(files.map(file=>file.name)));

    return allFiles.then(files=>
      files.filter(file=>file.name=="init.txt").length==1)
  }

  removeCard(card:string)
  {
    let rm=this.mem.deleteCard(card);
    rm.then(()=>removeFile(card));
  }

  modifyCardOnStore(card:cardToStore)
  {
    let modCard=this.mem.modifyCardOnStore(card);
    modCard.then(meta=>
          cacheFile(card.name,meta.content_hash,card.contents));
    return modCard;
  }

  getCardFromStore(name:string):Promise<string>
  {
    let cacheCard=getCacheFile(name);
    if(cacheCard.valid==true)
    {

      return Promise.resolve(JSON.stringify(cacheCard.content));
    }
    let card =this.mem.getCardFromStore(name);
    card.then(card=>cacheFile(name,card.hash,card.content))
    return card.then(card=>card.content);
  }

  createNewCardOnStore(card:cardToStore)
  {
    let cardCreation=this.mem.createNewCardOnStore(card);
    cardCreation.then(meta=>
      cacheFile(card.name,meta.content_hash,card.contents))
    return cardCreation;
  }
}

function reader (file)
 {
  return new Promise(function (resolve, reject)
  {
   let reader = new FileReader();
   reader.onload = function () {
    resolve(reader);
   };
   reader.onerror = reject;
   reader.readAsText(file);
  });
}

let memBossInst= new memBoss();

let deleteCard=memBossInst.removeCard,
    getCardFromStore=memBossInst.getCardFromStore,
    modifyCardOnStore=memBossInst.modifyCardOnStore,
    isInitiated=memBossInst.isReady,
    createNewCardOnStore=memBossInst.createNewCardOnStore;

const addListener= func =>memBossInst.listeners.push(func);


export {deleteCard,getCardFromStore,modifyCardOnStore,createNewCardOnStore,isInitiated}
export {setRequestForLocalStorage,init,getAccess,addListener};
