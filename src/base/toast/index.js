import Vue from 'vue';
import './toast.scss'

var Toast = {};



Toast.install = function (Vue,options) {
  let opt = {
    defaultType:'bottom',   // 默认显示位置
    duration:'2500'         // 持续时间
  }
  for(let property in options){
    opt[property] = options[property];  // 使用 options 的配置
  }
  Vue.prototype.$toast = (tips,type,duration) => {
    if(type){
      opt.defaultType = type;
    }
    if(duration){
      opt.duration = duration;
    }
    if(document.getElementsByClassName('toast-container').length){
      // 如果toast还在，则不再执行
      return;
    }
    let toastTpl = Vue.extend({
      template: '<div class="toast-container"><div class="toast toast-'+type+'"><div class="content">'+tips+'</div></div></div>'
    });
    let tpl = new toastTpl().$mount().$el;
    document.body.appendChild(tpl);
    setTimeout(function () {
      document.body.removeChild(tpl);
    }, opt.duration)
  }
  ['bottom', 'center', 'top'].forEach(type => {
    Vue.prototype.$toast[type] = (tips) => {
        return Vue.prototype.$toast(tips,type)
    }
  })
}

export default Toast;
