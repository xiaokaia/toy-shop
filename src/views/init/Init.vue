<template>
  <div></div>
</template>

<script type="text/ecmascript-6">
import myUrl  from 'common/js/api'
import { getQueryString } from 'utils'

export default {
  data () {
    return {
    }
  },
  components: {
  },
  created(){
    this.redireact();
  },
  computed: {
  },
  watch: {
  },
  mounted(){
  },
  methods:{
    redireact(){
      let baseUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize';
      let params = {
        appid:'wxabd86641604d7b49',
        redirect_uri:'http%3a%2f%2fhuanke.bcard.vip%2F%23%2Fauth',
        //redirect_uri:'http%3A%2F%2Fwww.baidu.com',
        response_type:'code',
        scope:'snsapi_userinfo',
        state:'STATE#wechat_redirect'
      }
      let redirectUrl = baseUrl + '?appid='+params.appid+'&redirect_uri='+params.redirect_uri+'&response_type='+params.response_type+'&scope='+params.scope+'&state='+params.state;
        window.location.href = redirectUrl;
      }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  @import "src/common/scss/mixins.scss";
  


  
</style>

