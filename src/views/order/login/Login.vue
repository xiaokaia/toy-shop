
<template>
  <div class="login-wrapper">
    <div class="login-box">
      <div class="tit">手机号</div>
      <div><input v-model="mobile" class="mobile"/></div>
      <div class="login-but" v-fb="{cls:'active'}" @click="validateMethod">登录</div>
    </div>
    <Loading v-show="loadingFlag"></Loading>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters,mapMutations } from 'vuex'
import { isvalidPhone,isNull } from 'utils/validate'
import { exceptMessage } from 'utils'
import Loading from 'base/loading/loading'
import apiUrl from 'common/js/api'
import Vue from "vue";
export default {
  data () {
    return {
      mobile:'',
    }
  },
  components: {
    Loading
  },
  created(){

  },
  computed: {
    ...mapGetters([
      'loadingFlag'
    ]),
  },
  mounted(){
  },
  methods:{
    validateMethod(){
      if(isNull(this.mobile)){
        this.$toast(exceptMessage('MOBILE_NULL'),'bottom');
      }else{
        if(!(isvalidPhone(this.mobile))){
          this.$toast(exceptMessage('MOBILE_ERROR'),'bottom');
          this.mobile = '';
        }else{
          this.loginMethod(this.mobile);
        }
      }
    },
    loginMethod(mobile){
      this.setLoading();
      this.$http.get(apiUrl.findMerchantMember+'/'+mobile+'').then(res => {
        if(res.code === 1){
          this.setLoading();
          sessionStorage.setItem('merchantMemberId',res.data.merchantMemberId);
          this.$router.push({
            path: '/pay',
            query:{
              orderNo:this.$route.query.orderNo
            }
          })
        }
      })
      .catch(error => {
        this.setLoading();
        this.$toast(error.message,'bottom');
      })
    },
    ...mapMutations({
      setLoading: 'SET_LOADING',
    })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  .login-wrapper{
    padding: 30px 50px 0px 50px;
    .login-box{
      .tit{
        color: #b3b6bd;
        margin-bottom: 10px;
      }
      .mobile{
        border:none;
        height:45px;
        line-height: 45px;
        background: #f6f6f6;
        padding-left: 15px;
        width:100%;
      }
      .login-but{
        width: 100%;
        height: 45px;
        line-height: 45px;
        background: $badge-red-bg;
        color: #ffffff;
        text-align: center;
        margin-top: 30px;
        font-size:16px;
        &.active{
          background: $badge-tap-red-bg;
        }
      }
    }
  }
</style>

