
<template>
  <div class="pay-wrapper">
    <div v-html="outhtml"></div>
    <div class="pay-info">
      <div class="pay-box">
        <div class="pay-box-inner">
          <div class="nick-name">Hi，{{ userinfo.nickName }}</div>
          <div class="need-pay">本次消费应付金额<span>¥{{ getPrice(orderObj.needAmount) }}</span></div>
        </div>
      </div>
    </div>
    <div class="pay-benefit">
      <div class="benefit-box basic-benefit">
        <div class="tit">优惠</div>
        <div class="benefit-group">
          <div class="list">
            <div class="l_l">优惠券</div>
            <div class="l_r">
              <span v-if="cardDisscount.length">您有{{ cardDisscount.length }}张可用优惠券</span>
              <span v-else>无</span>
              <span class="icon"></span>
            </div>
          </div>
          <div class="list" v-if="1===2">
            <div class="l_l">满减优惠</div>
            <div class="l_r">满60减5</div>
          </div>
        </div>
      </div>
      <div class="benefit-box member-benefit">
        <div class="tit">会员余额<span @click="login" v-if="merchantMemberId">(重新验证)</span></div>
        <div class="benefit-group">
          <div class="list" v-if="merchantMemberId">
            <div class="l_l">余额</div>
            <div class="l_r">¥ 0.00</div>
          </div>
          <div class="list no-login" @click="login" v-else>未登陆会员，<span>请先登陆</span></div>
        </div>
      </div>
      <div class="benefit-box all-benefit">
        <div class="benefit-group">
          <div class="list">
            <div class="l_l">订单金额</div>
            <div class="l_r">¥ {{ getPrice(orderObj.totalAmount) }}</div>
          </div>
          <div class="list" v-for="(item,index) in orderObj.discountTypes" :key="index">
            <div class="l_l">{{ $getDisscountType(item.discountSelected) }}</div>
            <div class="l_r">¥ {{ getPrice(item.benefitAmount) }}</div>
          </div>
          <!--<div class="list" v-if="1===2">
            <div class="l_l">优惠券</div>
            <div class="l_r">¥ 85.00</div>
          </div>
          <div class="list" v-if="1===2">
            <div class="l_l">满减优惠</div>
            <div class="l_r">¥ 85.00</div>
          </div>
          <div class="list" v-if="1===2">
            <div class="l_l">会员余额</div>
            <div class="l_r">¥ 85.00</div>
          </div>-->
          <div class="list">
            <div class="l_l">应付金额</div>
            <div class="l_r">¥ {{ getPrice(orderObj.needAmount) }}</div>
          </div>
        </div>
      </div>
      <div class="hj-box">
        <Call></Call>
      </div>
    </div>
    <div class="fix-pay-button" v-fb="{cls:'active'}" @click="payMethod">支付</div>
    <Loading v-show="loadingFlag"></Loading>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters,mapMutations } from 'vuex'
import Loading from 'base/loading/loading'
import apiUrl from 'common/js/api'
import Call from '@/components/call/Call'
import Vue from "vue";
import { getDisscountType } from 'filters'
import { aliPay } from 'utils/alipay'
Vue.prototype.$getDisscountType = getDisscountType

export default {
  data () {
    return {
      cardDisscount:[],//卡拳优惠
      cardSelected:[],//选中的卡券
      orderObj:{},
      merchantMemberId:null,//商户会员ID
      outhtml:''
    }
  },
  components: {
    Call,
    Loading
  },
  created(){
    this.getCardList();
    this.getOrderInfo(this.$route.query.orderNo);
  },
  computed: {
    ...mapGetters([
      'userinfo',
      'loadingFlag'
    ]),
  },
  mounted(){
  },
  methods:{
    login(){
      this.$router.push({
        path: '/login',
        query:{
          orderNo:this.$route.query.orderNo
        }
      })
    },
    getCardList(){
      let data = {};
      this.$http.post(apiUrl.getCardList,data).then(res => {
        if(res.code === 1){
          if(res.data && res.data.length){
            this.cardDisscount = res.data.filter(v => {//当前可用优惠券
              return v.chosen;
            })
            this.cardSelected = res.data.filter(s => {//当前选中
              return s.chosen;
            })
          }
        }
      })
      .catch(error => {
        this.$toast(error.message,'bottom');
      })
    },
    getPrice(price){
      return (price / 100).toFixed(2)
    },
    async getOrderInfo(orderNo){
      let num = 1;
      num = num|1<<1|(1<<2)|(1<<3);
      this.setLoading();
      this.$http.post(apiUrl.getOrderInfoByOrderNo+'/'+orderNo+'/'+num.toString(2)+'').then(res => {
        if(res.code === 1){
          this.setLoading();
          this.orderObj = res.data;
          if(sessionStorage.getItem('merchantMemberId')){
            this.merchantMemberId = sessionStorage.getItem('merchantMemberId');
            this.reCalculate(this.merchantMemberId);
          }
        }
      })
      .catch(error => {
        this.setLoading();
        this.$toast(error.message,'bottom');
      })
    },
    reCalculate(merchantMemberId){
      let data = {
        orderId: this.orderObj.orderId,
        merchantMemberId:merchantMemberId,
        peoples: this.orderObj.peoples,
      }
      this.$http.post(apiUrl.calculatePrice,data).then(res => {
        if(res.code === 1){
          this.orderObj = res.data;
        }
      })
      .catch(error => {
        this.$toast(error.message,'bottom');
      })
    },
    payMethod(){
      let ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == "micromessenger") {//微信
        this.getPayOrder(1);
      }else if(ua.match(/Alipay/i) == "alipay"){//支付宝
        this.getPayOrder(2);
      }
    },
    getPayOrder(type){
      let data = {
        'discountSelected':this.orderObj.discountSelected,
        'orderNo':this.$route.query.orderNo,
        'payParamList':[],
        'orderDiscountList':[] //优惠方式（卡券）
      }
      let datali = {
        'paymentScene':5, //付场景 1:收银台付款码 2:店铺收款码 3:订单小票支付二维码 4:pos扫用户 5:h5点餐在线支付 7:刷卡 8:app支付
        'paymentType':2 //支付方式 1:支付宝 2:微信 3:银联钱包 4:刷卡 5:现金 6:云闪付 8:会员 9:优惠券 10:美团券 12:预付券
      }
      if(type === 1){
        datali.paymentType = 1;
      }
      data.payParamList.push(datali);
      this.setLoading();
      this.$http.post(apiUrl.payOrder,data).then(res => {
        if(res.code === 1){
          this.setLoading();
          if(res.data.bizData.indexOf('payForm') > 0){//表单提交支付方式
            this.outhtml = res.data.bizData;
            setTimeout(function(){
              document.getElementById('payForm').submit();//执行表单
            },20)
          }else{//对象提交支付
            if(type === 1) {//微信支付
              let obj = JSON.parse(res.data.bizData);
              this.wchatPay(obj);
            }else{//支付宝支付
              aliPay(res.data.bizData);
            }
          }
        }
      })
      .catch(error => {
        this.setLoading();
        this.$toast(error.message,'bottom');
      })
    },
    wchatPay(obj){
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',{
          "appId":obj.appId,
          "timeStamp":obj.timeStamp,
          //"status":"0",
          "signType":obj.signType,
          "package":obj.package,
          //"callback_url":null,
          "nonceStr":obj.nonceStr,
          "paySign":obj.paySign
        },
        function(res){
          if(res.err_msg == "get_brand_wcpay_request:ok" ) {//支付完成

          }else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            alert('支付取消');
          }else {
            alert('支付失败');
          }
        }
      )
    },
    ...mapMutations({
      setLoading: 'SET_LOADING',
    })
  },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  .pay-wrapper{
    background: #f6f6f6;
    position: absolute;
    top:0;
    width: 100%;
    min-height: 100%;
    .fix-pay-button{
      position: fixed;
      bottom: 0px;
      width: 100%;
      height: 45px;
      line-height: 45px;
      background: $badge-red-bg;
      color: #ffffff;
      text-align: center;
      font-size: 16px;
      &.active{
        background: $badge-tap-red-bg;
      }
    }
    .pay-benefit{
      margin-bottom: 45px;
      .hj-box{
        padding-top: 15px;
        padding-bottom: 15px;
      }
      .benefit-box{
        margin-top: 10px;
        padding: 15px 15px 0px 15px;
        background: #ffffff;
        position: relative;
        overflow: hidden;
        .tit{
          color: #b3b6bd;
          & span{
            color:#e31436;
            font-size: 12px;
            margin-left: 5px;
          }
        }
        .benefit-group{
          & .list:first-child{
            border: none;
          }
          & .list{
            display: flex;
            padding-top: 15px;
            padding-bottom: 15px;
            border-top: 1px solid #eeeeee;
            &.no-login{
              text-align: center;
              display: block;
              color: #7b7c88;
              & span{
                color:#111111;
              }
            }
            & .l_l{
              flex: 1;
            }
            & .l_r{
              color: #7b7c88;
              & .icon{
                display: inline-block;
                width: 8px;
                height: 15px;
                background: url('./icon_arrow.png') no-repeat center center;
                background-size: 8px 15px;
                vertical-align: middle;
                margin-left: 5px;
              }
            }
          }
        }
        &.all-benefit{
          color: #7b7c88;
          & .list{
            border: none;
            padding: 0 0;
            margin-bottom: 15px;
          }
        }
      }
    }
    .pay-info{
      padding: 15px 15px;
      background: #20132f;
      text-align: center;
      font-size: 18px;
      .pay-box{
        background: #fdfcf6;
        padding: 15px 15px;
        border-radius: 5px;
        .pay-box-inner{
          border: 1px solid #c89f66;
          padding-top: 30px;
          padding-bottom: 30px;
          .nick-name{
            margin-bottom: 15px;
          }
          .need-pay{
            color: #7b7c88;
            & span{
              color: #e31436;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
</style>

