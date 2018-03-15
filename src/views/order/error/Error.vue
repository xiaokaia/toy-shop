<template>
  <div class="error-wrapper">
    <div class="notice" :class="currentClass"></div>
    <p class="tip">{{ currentContent }}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return{
        currentClass: '',
        currentContent: '',
      }
    },
    mounted() {
      let type = parseInt(this.$route.query.type);
      this.exceptMethod(type);
    },
    methods: {
      exceptMethod(type){
        switch(type){
          case 0:
            this.currentClass = 'browser';
            this.currentContent = '请在微信浏览器打开';
            break;
          case 3519:
            this.currentClass = 'no-pay';
            this.currentContent = '该桌台暂时还未结账，请联系服务员点餐。';
            break;
          case 3521:
            this.currentClass = 'no-open';
            this.currentContent = '商家未开通高级功能';
            break;
          case 3518:
            this.currentClass = 'close';
            this.currentContent = '商家已关闭在线点餐，请联系服务员。';
            break;
          default:
            this.currentClass = 'browser';
            this.currentContent = '未知错误';
            break;
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  .error-wrapper{
    text-align: center;
    position: fixed;
    height: 100%;
    bottom: 0;
    width: 100%;
    .notice{
      position: relative;
      width: 100px;
      height: 100px;
      margin: 0 auto;
      margin-top: 20%;
      &.browser{
        background: url(./fail.png) no-repeat top center;
        background-size: 100px 106px;
      }
      &.close{
        background: url(./img_guanbidiancan.png) no-repeat top center;
        background-size: 100px 100px;
      }
      &.no-pay{
        background: url(./img_zhuotaisuoding.png) no-repeat top center;
        background-size: 100px 100px;
      }
      &.no-open{
        background: url(./img_zhuohaoshixiao.png) no-repeat top center;
        background-size: 100px 100px;
      }
    }
    .tip{
      color:#646464;
      font-size: 15px;
      margin-top: 35px;
    }
  }
</style>
