<template>
  <div class="list-wrapper">
    <div class="list-top">
      <div>
        <span>{{ orderObj.deskInfo.areaDeskName}}<span class="person">{{ orderObj.peoples }}人</span></span>
        <span class="shopStatus">{{ $getOrderStatus(orderObj.orderStatus) }}</span>
      </div>
      <div>
        <span>订单备注</span>
        <span class="right">{{ orderObj.remark?orderObj.remark : '无' }}</span>
      </div>
      <div>
        <span>总计金额</span>
        <span class="right">¥ {{ toYuan(orderObj.needAmount) }}</span>
      </div>
    </div>
    <div class="bg-title">
      <p class="titel">美食{{ foodItems.length }}个</p>
    </div>
    <div class="list-content">
      <Scroll ref="suggest"
        class="suggest"
        :data="foodItems"
        :pullup="pullup"
        :beforeScroll="beforeScroll"
        @scrollToEnd="searchMore"
      >
        <ul>
          <li v-for="(item,index) in foodItems" :key="index">
            <div class="box-left">
              <div class="img-box">
                <img v-if="item.mediaId" v-lazy="getDinnerImg(''+item.mediaId+'')">
                <img v-else src="../../../common/image/default.png"/>
              </div>
              <p class="number">x{{ item.sellVolume }}</p>
            </div>
            <div class="box-right">
              <div class="order-title">
                  <p>{{ item.goodsName }}</p>
                  <div>¥{{ toYuan(item.sellPrice) }}<span v-show="1===2">(会员)</span></div>
              </div>
              <span v-show="1===2">sadly rice</span>
              <p class="order-info" v-if="item.itemAttrList && item.itemAttrList.length">
                <span v-for="(child,Cindex) in item.itemAttrList" :key="Cindex" >
                  <span v-if="child.attrCode != 'PACKAGE' && child.itemAttrValueList && child.itemAttrValueList.length">{{child.attrName}}：</span>
                  <span  v-for="(el,eindex) in child.itemAttrValueList" :key="eindex" ><span v-if="eindex != 0">/</span> {{ el.attrValueName }}
                  <span v-if="Cindex != item.itemAttrList.length-1 && el.attrCode=='PACKAGE'">/</span>
                  </span>
                </span>
              </p>
              <P class="order-info" v-if="item.remark">备注：{{ item.remark }}</P>
            </div>
            <img src="./icon_kanjia.png" alt="" class="kanjia" v-if="item.cutPriceFlag != 'UNABLE'">
          </li>
        </ul>
      </Scroll>
    </div>
    <div class="list-bottom" v-if="orderStatus =='WAIT_PAY'">
      <div>砍价</div>
      <div class="center">加菜</div>
      <div @click="goPay">结账</div>
    </div>
    <div class="list-bottom" v-else>
      <div @click="cancelDialog">取消订单</div>
      <div>撤回,重新编辑</div>
    </div>
    <Confirm ref="confirm" @confirm="cancelOrder" :text="confirmTxt"></Confirm>
    <Loading v-show="loadingFlag"></Loading>
  </div>
</template>

<script type="text/ecmascript-6">
import apiUrl from 'common/js/api';
import { mapGetters,mapMutations } from 'vuex';
import { getOrderStatus } from 'filters';
import Scroll from '@/base/scroll/scroll';
import Loading from 'base/loading/loading'
import Vue from "vue";
import Confirm from 'base/confirm/confirm'
import { getImg,cutStr,exceptMessage } from 'utils'
Vue.prototype.$getOrderStatus = getOrderStatus
export default {
  data () {
    return {
      result:[],
      pullup:true,
      beforeScroll:true,
      orderNo:'',
      foodItems:[],
      orderObj:{
        deskInfo:{},

      },
      confirmTxt:'是否取消订单?',
      orderStatus:'',
      timer:null,
      interval:5000
    }
  },
  components: {
     Scroll,
     Confirm,
     Loading
  },
  created(){
  },
  computed: {
    ...mapGetters([
      'loadingFlag',
    ]),
  },
  mounted(){
    this.orderNo = this.$route.query.orderNo;
    this.getOrderinfo();
    this.timer = setInterval(() => {
      this.getOrderStatus()
    },this.interval)
  },
  beforeDestroy(){//清除定时器
    clearInterval(this.timer);
  },
  methods:{
    filterArray(){//过滤数组
      this.foodItems = [];
      this.packgeList = [];
      this.packageLength = 0;
      this.orderObj.orderItems.reverse().find(item => {
        if(item.skuId != -999907){
          if(item.packStatus == 'PACK' && !item.freeDishStatus){
            this.packageLength += item.sellVolume;
          }
          if(this.orderFirst && this.orderObj.orderType == 'EAT_FIRST'){
            if(item.appendDishStatus && item.appendDishStatus){//追加菜放最前面
              this.foodItems.unshift(item);
            }else{
              this.foodItems.push(item);
            }
          }else{
            if(item.appendDishStatus){//追加菜放最前面
              this.foodItems.unshift(item);
            }else{
              this.foodItems.push(item);
            }
          }
        }else{
          if(item.sellPrice > 0){
            this.packgeList.push(item);
          }
        }
      })
      this.sortArray(this.foodItems);
    },
    sortArray(arr){
      var temp = [];
      arr.forEach(function(item, index) {
        var skey = item.orderVersion + item.goodsId + item.skuId;
        if(typeof temp[skey] == "undefined") {
          temp[skey] = item;
        }else{
          temp[skey]["sellVolume"] += item["sellVolume"];
        }
      })
      var result = [];
      for(var i in temp) {
        result.push(temp[i]);
      }
      this.foodItems = result;
    },
    getOrderinfo(){
      this.setLoading();
      let num = 1;
      num = num|1<<1|(1<<2)|(1<<3); //基础信息，订单物品，优惠详情，餐桌信息
      this.$http.get(apiUrl.getOrderInfoByOrderNo+'/'+this.orderNo+'/'+num.toString(2)).then(res => {
        if(res.code === 1){
          this.setLoading();
          this.orderObj = res.data;
          this.orderStatus = res.data.orderStatus
          this.filterArray();
        }
      })
      .catch(error => {
        this.setLoading();
         this.$toast(error.message,'bottom');
      })
    },
    getOrderStatus(){
      this.$http.get(apiUrl.getStatusByOrderNo +'/'+ this.orderNo).then(res => {
        if(res.code === 1){
          this.orderStatus = res.data.orderStatus;
        }
      })
      .catch(error => {
        this.$toast(error.message,'bottom');
      })
    },
    filterValue(arry){
      let result = arry.filter(v => {
        return v.active;
      })
      return result;
    },
    toYuan(number){
      let money = (number/100).toFixed(2);
      return money
    },
    getDinnerImg(mediaIds,type){
      return getImg(mediaIds,type);
    },
    cancelDialog(){
      this.$refs.confirm.show();
    },
    cancelOrder(){
      let data = {};
      this.setLoading();
      this.$http.post(apiUrl.cancelOrder +'?orderId='+this.orderObj.orderId,data).then(res => {
        if(res.code === 1){
          this.setLoading();
          //回到点餐首页
          this.setMap();
          sessionStorage.removeItem('nums');
          this.$router.push({
            path:'/init',
            query:{
              tableId:sessionStorage.getItem('tableId')
            }
          })
        }
      })
      .catch(error => {
        this.setLoading();
        this.$toast(error.message,'bottom');
      })
    },
    searchMore(){

    },
    goPay(){
      this.$router.push({
        path:'/pay',
        query:{
        orderNo:this.orderNo
        }
      })
    },
    ...mapMutations({
      setLoading: 'SET_LOADING',
      setMap:'SET_NULL'
    })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  .list-wrapper{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    background: $badge-default-bg;
    color: #7b7c88
  }
  .list-top{
    padding: 20px 15px 5px 15px;
    background-color: #fff;
    font-size: 13px;
    position: fixed;
    width: 100%;
    top: 0;
    height: auto;
    box-shadow: 1px 2px 2px rgba(#dfdfe3,0.5);
    z-index: 9999;
  }
  .list-top div{
    display: flex;
    justify-content:space-between;
    margin-bottom: 15px;

  }
  .right{
    color: #111111
  }
  .person{
    color: #111111;
    margin-left: 8px;
  }
  .shopStatus{
    color: #88ab95;
    font-size: 15px
  }
  .list-content{
    // background-color:pink;
    position: fixed;
    height: 65%;
    width: 100%;
    top: 160px;
    padding: 0 15px;
    @media only screen and (min-device-width: 320px) and (max-device-width: 374px){
       height:58%
      }
  }
    .suggest{
      height: 100%;
      position: relative;
      top:0;
    }
    ul{
        height: auto;
        overflow: hidden;
      }
      ul li{
        padding: 20px 15px;
        height: auto;
        background-color: #fff;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 5px;
      }
        .box-left{
          width: 20%;
          margin-right: 10px;
        }
        .img-box{
          width: 100%;
          height: auto;
          margin-bottom: 5px;
        }
        img{
          width: 100%;
          height: 100%;
        }
        .kanjia{
          position: absolute;
          right: 0;
          top: 0;
          width: 30px;
          height: 30px
        }
        .number{
          width: 100%;
          text-align: center
        }
        .box-right{
          width: 80%;
          padding-top: 5px;
          font-size: 10px;
        }
        .order-title{
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
         .order-title p{
           color: #111111;
           font-size: 12px
         }
         .order-title div{
           color: #e31436
         }
         .order-title span{
           margin-left: 8px;
         }
        .order-info{
          margin-top: 10px;

        }
  .list-bottom{
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index:9999;
    display: flex;
    justify-content: space-between
  }
  .center{
      background-color: black;
      color: #fff
  }
  .list-bottom div{
    line-height: 50px;
    width: 50%;
    text-align: center
  }
  .list-bottom div:first-child{
    color: #111111;
    background-color: #fff;
  }
  .list-bottom div:last-child{
    color:#fff;
    background-color:#e31416;
  }
  .bg-title{
     height: 44px;
     line-height: 44px;
     width: 100%;
     position: fixed;
     top:117px;
     z-index:9999;
     background: $badge-default-bg;
   }
   .titel{
     z-index: 9999;
     text-align: center;
     position: relative;
     &::before{
        content: '';
        z-index: 99;
        position: absolute;
        width: 5px;
        height: 1px;
        background: #b3b6bd;
        left: 50%;
        top:50%;
        margin-left: -40px;
     };
     &::after{
        content: '';
        z-index: 99;
        position: absolute;
        width: 5px;
        height: 1px;
        background: #b3b6bd;
        left: 50%;
        top:50%;
        margin-left: 35px;
     }


   }
</style>

