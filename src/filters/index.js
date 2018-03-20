/**
 * 过滤器-工具类
 * author by kairry 2017年11月20日
 */

 /**
  * 转时间戳未时分秒
  */
export function filterTime(nS){
  let getString = function (m) {
    return m < 10 ? '0' + m:m
  }
  let time = new Date(nS),
      y = time.getFullYear(),
      m = time.getMonth()+1,
      d = time.getDate(),
      h = time.getHours(),
      mm = time.getMinutes(),
      s = time.getSeconds();
  return y+'-'+getString(m)+'-'+getString(d)+' '+getString(h)+':'+getString(mm)+':'+getString(s);
}

