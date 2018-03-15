/**
 * author by karry 2017年11月29日
 * 本地缓存工具类 cookie
 */

 export function set(name, value){
  // 缓存过期时间
  let Days = 30
  let exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
 }

 export function get(name){
  let arr = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let reg = arr
  arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  }else{
    return null
  }
 }

 export function del(name){
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = this.cookie.get(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/'
  }
 }
