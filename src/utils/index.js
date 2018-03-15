/**
 * author by karry 2017年11月29日
 * 通用方法
 */

import md5 from 'js-md5'
import baseUrl from 'config/env'
 /**
  * 异常提示
  * type: 场景
  * param: 多余参数
  */
export function exceptMessage(type,param){
  var typeMap = {
    SPEC_ERROR: '请选择完整的规格',
    GROUP_ERROR: '该组合只能选择'+param+'份美食',
    FULL_GROUP_ERROR: '请选择完整的美食',
    EVERY_ERROR: '请选择任意两份美食',
    ADDORDER_ERROR: '请先选择美食再下单',
    WEIGHT_ERROR: '计重菜请联系服务员下单',
    SELLOUT_ERROR: '美食已售罄',
    MOBILE_NULL: '手机号不能为空',
    MOBILE_ERROR: '手机号输入有误，请重输'
  }
  return typeMap[type] || '未找到该类型错误';//默认
}

/**
 * 获取图片
 * @param {*七牛云id} mediaId
 * @param {*类型} type  0:热销美食图片  1:普通美食图片 2:套餐美食图片
 */
export function getImg(mediaId,type){
  let width = 0;
  if(type === 0){
    width = parseInt((window.innerWidth * 0.8) * 0.9);
  }else if(type === 1){
    width = parseInt(window.innerWidth / 2 - 15);
  }else if(type === 2){
    width = 140;
  }else if(type === 3){
    width = parseInt((window.innerWidth * 0.8) - 30);
  }
  return baseUrl.imgURL + '/' + md5(mediaId) + '?imageView2/0/w/'+ width +'';
}

/**
 * 返回去除协议的url
 */
export function returnUrl(){
  let str = location.href.indexOf("https") > -1 ? 'https':'http';
  let reg = new RegExp(''+str+':\/\/([^\/]+)\/','i');
  return location.href.match(reg)[1];
}

/**
 * 加载添加?
 */
export function directRightUrl(){
  let paths = window.location.href.split('#')
  paths[1] = paths[1] || '/'
  if (paths[0].charAt(paths[0].length - 1) !== '?') {
    paths[0] = `${paths[0]}?`
  }
  if (paths[1].charAt(0) === '!') {
    paths[1] = paths[1].substr(1)
  }
  let url = `${paths[0]}#${paths[1]}`
  if (window.location.href !== url) {
    window.location.href = url
  }
}

/**
 * 字符串转hashcode
 * @param {*} str
 */
export function hashCode(str){
  let hash = 0;
  if (str.length == 0) return hash;
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

/**
 * 统一获取URL参数
 * @param {*} str
 */
export function getQueryString(str){
  return decodeURIComponent((new RegExp('[?|&]'+str+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
}

/**
 * 判断微信浏览器
 */
export function is_weixn(){
  let ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}

/**
 * 判断支付宝浏览器
 */
export function is_alipay(){
  let ua = navigator.userAgent.toLowerCase();
  if(ua.match(/Alipay/i) == "alipay") {
    return true;
  } else {
    return false;
  }
}

/**
 * 动态更改标题栏(ios标题栏无法更改)
 */
export function setWechatTitle(title, img){
  if (title === undefined || window.document.title === title) {
    return
  }
  document.title = title;
  var mobile = navigator.userAgent.toLowerCase();//判断浏览器
  if (/iphone|ipad|ipod/.test(mobile)) {//iphone
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.setAttribute('src', img || '/favicon.ico');
    var iframeCallback = function () {
      setTimeout(function () {
        iframe.removeEventListener('load', iframeCallback)
        document.body.removeChild(iframe)
      }, 0)
    }
    iframe.addEventListener('load', iframeCallback)
    document.body.appendChild(iframe)
  }
}

/**
 * 截取字符串
 * @param {*} str
 * @param {*} len
 */
export function cutStr(str, len){
  var str_length = 0;
  var str_len = 0;
  var str_cut = new String();
  var str_len = str.length;
  for (var i = 0; i < str_len; i++) {
      var a = str.charAt(i);
      str_length++;
      if(escape(a).length > 4) {
        //中文字符的长度经编码之后大于4
        str_length++;
      }
      str_cut = str_cut.concat(a);
      if(str_length >= len) {
        str_cut = str_cut.concat("...");
        return str_cut;
      }
  }
  //如果给定字符串小于指定长度，则返回源字符串；
  if (str_length < len) {
    return str;
  }
}


