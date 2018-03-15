/**
 * axios基础封装类
 * author by kairry 2017年11月20日
 */

import axios from 'axios'
import Qs from 'qs'
import Vue from 'vue'
import Toast from 'base/toast';
Vue.use(Toast);


const Axios = axios.create({
  timeout: 10000, //请求超时时间
  responseType: "json",
  withCredentials: true, //是否允许携带cookie
  headers: {
    //"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
})

/**
 * POST传参序列化(添加请求拦截器)
 */
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (config.method === "post" || config.method === "put" || config.method === "delete") {
      // 序列化
      if(!config.data){
        config.data = Qs.stringify(config.data);
      }
    }
    config.headers.common['lz-system'] = 'client' //设置header信息
    return config;
  },
  error => {
    console.log(error.data.message);
    return Promise.reject(error.data.message);
  }
);

/**
 * 返回状态判断(添加响应拦截器)
 */
Axios.interceptors.response.use((res) => {
  if (res.data && res.data.code != 1) {
    return Promise.reject(res.data);
  }
  return res.data;
},(error) => {
  //服务器异常提示
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
      error.message = '错误请求'
      break;
      case 404:
      error.message = '请求错误,未找到该资源'
      break;
      case 408:
      err.message = '请求超时'
      break;
      case 500:
      error.message = '服务器端异常'
      break;
      default:
      error.message = '连接错误${err.response.status}'
    }
  }else{
    error.message = "连接到服务器失败"
  }
  Vue.prototype.$toast(error.message,'bottom');
  return Promise.reject(error); //返回response的错误信息
})

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function (value, Option) {
    Object.defineProperty(Vue.prototype, "$http", {
      value: Axios
    });
  }
}
