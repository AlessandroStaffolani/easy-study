/*@flow*/
import {reservedField} from '../utils';


  function clean(remotekeys:Array<string>)
  {
    let localkeys= (new Array(localStorage.length)).fill(1).map(
      (elem,index)=>localStorage.key(index));
    let toRemove= localkeys.filter(name=>(
      !remotekeys.includes(name) && !reservedField.includes(name)));
    toRemove.map((name)=>localStorage.removeItem(name));
  }

  function check(name:string,hash:string)
  {
    if(localStorage.getItem(name)==null || JSON.parse(localStorage.getItem(name)).hash!==hash)
    {
      let valid=false;
      localStorage.setItem(name,JSON.stringify({valid}))
    }
  }

  function invalidate(name)
  {
    let valid=false;
    localStorage.setItem(name,JSON.stringify({valid}))
  }

  function cacheFile(name:string,hash:string,content:string)
  {
    let nameFile=name+".txt";
    let valid=true;
    localStorage.setItem(nameFile,JSON.stringify({hash,content,valid}));
  }

  function removeFile(name:string)
  {
    let nameFile=name+".txt";
    localStorage.removeItem(nameFile)
  }

  function getCacheFile(name:string)
  {
    let nameFile=name+".txt";
    if(localStorage.getItem(nameFile)==null)
    {
      return false;
    }
    let item=JSON.parse(localStorage.getItem(nameFile));
    let valid=false,content="";
    switch(item.valid)
    {
      case true:
        valid=true,content=JSON.parse(item.content);
        return {valid,content}
      default:
      return {valid,content};
    }
  }

export {getCacheFile,removeFile,cacheFile,invalidate,check,clean};
