/**
 * author by karry 2017年11月29日
 * 本地缓存工具类 localStorage
 */

export function put (key,stringVal,time) {
  try{
    if(!localStorage){return false;}
    if(!time || isNaN(time)){time=60000000000;}
    var cacheExpireDate = (new Date()-1)+time*1000;
    var cacheVal = {val:stringVal,exp:cacheExpireDate};
    localStorage.setItem(key,JSON.stringify(cacheVal));//存入缓存值
    //console.log(key+":存入缓存，"+new Date(cacheExpireDate)+"到期");
  }catch(e){}
}

export function get (key){
  try{
    if(!localStorage){return false;}
    var cacheVal = localStorage.getItem(key);
    var result = JSON.parse(cacheVal);
    var now = new Date()-1;
    if(!result){return null;}//缓存不存在
    if(now>result.exp){//缓存过期
      this.remove(key);
      return "";
    }
    //console.log("get cache:"+key);
    return result.val;
  }catch(e){
    this.remove(key);
    return null;
  }
}

export function remove(key){
  if(!localStorage){return false;}
  localStorage.removeItem(key);
}

export function clear(){
  if(!localStorage){return false;}
  localStorage.clear();
}
