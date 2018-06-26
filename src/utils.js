/*@flow*/
async function getTimeRandomUUID():Promise<string> //TODO indagate quality
{
    var array = new Uint8Array(10);
    window.crypto.getRandomValues(array);
    var d = new Date().getTime();
    var returnString=""+d.toString();
    for (var i = 0; i < array.length; i++) //TODO replace with map reduce
     {
        returnString=returnString.concat(array[i].toString());
    }
    return returnString;
}

 function parseQueryString(str: string) {
    var ret = Object.create(null);

    if (typeof str !== 'string') {
      return ret;
    }

    str = str.trim().replace(/^(\?|#|&)/, '');

    if (!str) {
      return ret;
    }

    str.split('&').forEach(function (param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      // Firefox (pre 40) decodes `%3D` to `=`
      // https://github.com/sindresorhus/query-string/pull/37
      var key = parts.shift();
      var val = parts.length > 0 ? parts.join('=') : undefined;

      key = decodeURIComponent(key);

      // missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      val = val === undefined ? null : decodeURIComponent(val);

      if (ret[key] === undefined) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }
    });

    return ret;
  }

  function str2absync(/*String:*/ str) /*:ArrayBuffer*/
  {
      var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
      var bufView = new Uint16Array(buf);
      for (var i = 0, strLen = str.length; i < strLen; i++)
      {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
  }

  function ab2strsync(buf)
  {
      return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

/*tnx to https://stackoverflow.com/users/157247/t-j-crowder code taken from his
  answer on stackoverflow at https://stackoverflow.com/questions/22707475/how-to-make-a-promise-from-settimeout*/
function later(delay)
{
  return new Promise(function(resolve) {
      setTimeout(resolve, delay);
  });
}
const invert  = (p)  => new Promise((res, rej) => p.then(rej, res));
const firstOf = (ps) => invert(Promise.all(ps.map(invert)));
const getTimeStamp=()=>(new Date).getTime();

export const reservedField=["masterAPI","masterToken"];

export {getTimeRandomUUID,parseQueryString,str2absync,ab2strsync,later,getTimeStamp};
