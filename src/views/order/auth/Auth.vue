<template>
  <div class="auth-wrapper"></div>
</template>
<script>
  import { clear } from 'utils/cache'
  import { getQueryString,is_weixn,is_alipay,returnUrl } from 'utils'
  import apiUrl from 'common/js/api'
  export default{
    data(){
        return {
        }
    },
    watch: {
    },
    created (){
      clear();//清除localStorage
      let shopId = getQueryString('shopId');
      let merchId = getQueryString('merchId');
      let tableId = getQueryString('tableId');
      let type = getQueryString('type') ? getQueryString('type') : 1; //业务场景  2:商户付款 4:扫小票支付 3:砍价授权 1:点餐
      sessionStorage.setItem('shopId',shopId);
      sessionStorage.setItem('merchId',merchId);
      sessionStorage.setItem('tableId',tableId);
      if(is_weixn()) {//微信
        window.location.href = apiUrl.wechatOauth + '?merchantId='+merchId+'&shopId='+shopId+'&callback=http%3A%2F%2F'+this.getUrl(shopId,merchId,tableId,type);
      }else if(is_alipay() && (type == 4 || type == 2)){//支付宝
        window.location.href = apiUrl.alipayOauth + '?merchantId='+merchId+'&shopId='+shopId+'&callback=http%3A%2F%2F'+this.getUrl(shopId,merchId,tableId,type);
      }else{
        this.$router.push({
          path:'/error',
          query:{
            type:0
          }
        })
      }
    },

    components: {
    },
    methods:{
      getUrl(shopId,merchId,tableId,type){
        let cutId = getQueryString('cutId');//砍价
        let jumpUrl = '';

        switch(type){
          case 1:
            jumpUrl = returnUrl() + '%2F%23%2Finit'+ encodeURIComponent('?tableId='+tableId) +'';
            break;
          case 2:
            jumpUrl = returnUrl() + encodeURIComponent('?shopId='+shopId) + '%2F%23%2FmerchPay';
            break;
          case 3:
            jumpUrl = returnUrl() + '%2F%23%2Fbargain'+encodeURIComponent('?cutId='+cutId)+'';
            break;
          case 4:
            let orderNo = getQueryString('orderNo');
            jumpUrl = returnUrl() + + '%2F%23%2Fpay'+encodeURIComponent('?orderNo='+orderNo+'&type=4')+'';
            if(is_alipay()){
              jumpUrl = returnUrl() + + '%2F%23%2Fposlist'+encodeURIComponent('?orderNo='+orderNo+'&type=4')+'';
            }
            break;
          default:
        }
        return jumpUrl;
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
</style>
