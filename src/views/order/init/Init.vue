
<template>
  <div class="init-wrapper" v-if="isShow">
    <div class="shop-info">
      <p class="shop-name">{{ deskname }}</p>
      <p class="user-name" v-if="userinfo">欢迎光临，{{ userinfo.nickName }}</p>
    </div>
    <div class="shop-notice">
      <div class="notice-box">
        <div class="notice-title">商家公告</div>
        <div class="notice-content">{{ notice }}</div>
      </div>
    </div>
    <div class="fix-bottom">
      <div class="start" @click="start">开始点单</div>
      <div class="banquan">李子科技 提供技术支持</div>
    </div>
    <div class="select-nums" v-show="numsFlag" @click="numsFlag = false">
      <ul>
        <div v-for="(item,index) in nums" :key="index">
          <li :style="{ width:liW + 'px',height:liH + 'px' }" v-for="(child,cindex) in item.child" :key="cindex" :class="{ active : currentNum == child }" @click.stop="selectNum(child)"><span>{{ child }}</span></li>
        </div>
      </ul>
    </div>
    <Loading v-show="loadingFlag"></Loading>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters,mapMutations } from 'vuex'
import apiUrl from 'common/js/api'
import Loading from 'base/loading/loading'
import Vue from "vue"
export default {
  data () {
    return {
      notice:'',
      deskname:'',
      liW:0,
      liH:0,
      isShow:false,
      currentNum:0,
      numsFlag:false,
      nums:[
        {
          child:[1,2,3,4,5]
        },
        {
          child:[6,7,8,9,10]
        },
        {
          child:[11,12,13,14,15]
        },
        {
          child:[16,17,18,19,20]
        }
      ],
      isSelect:false
    }
  },
  components: {
    Loading
  },
  created(){
    if(!sessionStorage.getItem('userInfo')){
      this.getUserInfo();//获取微信用户信息
    }
    this.getOrderNo(this.$route.query.tableId).then((v) => {
      if(v != undefined){
        if(v === ''){
          this.isShow = true;
          this.getShopNotice();
          this.getTableData();
          this.getShopConfig();
          this.liW = this.liH = (window.innerWidth - 60 - (15*4)) / 5;
        }else{
          this.$router.push({
            path: '/list',
            query:{
              orderNo:v
            }
          })
        }
      }
    })
  },
  computed: {
    ...mapGetters([
      'userinfo',
      'loadingFlag',
    ]),
  },
  mounted(){
  },
  methods:{
    start(){
      if(sessionStorage.getItem('nums') || !this.isSelect){
        this.$router.push({
          path: '/index'
        })
        //this.currentNum = sessionStorage.getItem('nums');
      }else{
        this.numsFlag = true;
      }
    },
    getUserInfo(){
      this.$http.get(apiUrl.userInfo).then(res => {
        if(res.code === 1){
          sessionStorage.setItem('userInfo',JSON.stringify(res.data));
          this.setUserInfo(res.data);
        }
      })
      .catch(error => {
        this.$toast(error.message,'bottom');
      })
    },
    getTableData(){
      let tableId = this.$route.query.tableId
      this.$http.get(apiUrl.findAreaDeskById + '?areaDeskId='+tableId).then(res => {
        if(res.code === 1){
          this.deskname = res.data.deskName;
        }
      })
      .catch(error => {
        this.setLoading();
        this.$toast(error.message,'bottom');
      })
    },
    getShopNotice(){
      this.$http.get(apiUrl.getShopNotice).then(res => {
        if(res.code === 1){
          if(res.data){
            if(res.data.content != ''){
              this.notice = res.data.content;
            }else{
              this.notice = '暂无公告'
            }
          }else{
            this.notice = '暂无公告'
          }
        }
      })
      .catch(error => {
        this.$toast(error.message,'bottom');
      })
    },
    selectNum(num){
      let _this = this;
      this.currentNum = num;
      sessionStorage.setItem('nums',this.currentNum);
      setTimeout(function(){
        _this.$router.push({
          path: '/index'
        })
      },300)
    },
    getShopConfig(){
      this.setLoading();
      this.$http.get(apiUrl.listShopSettings).then(res => {
        if(res.code === 1){
          this.setLoading();
          if(res.data && res.data.length){
            for(let item of res.data){
              if(item.openStatus == 'OPEN' && item.settingCode == 1005){//开启茶位费  1005：茶位费 1006：打包费
                this.isSelect = true;
              }else{//是否附加费
                if(item.openStatus == 'OPEN' && item.shopSettingValues.length){
                  for(let value of item.shopSettingValues){
                    if(value.feeMode  === 'PEOPLE_MODE'){//按人数计算
                      this.isSelect = true;
                    }
                  }
                }
              }
            }
          }
        }
      })
      .catch(error =>{
        this.setLoading();
        this.$toast.bottom(error.data.message);
      })
    },
    async getOrderNo(tableId){
      let orderNo = await this.$http.get(apiUrl.getOrderByDeskId+'/'+tableId+'').then(res => {
        if(res.code === 1){
          if(res.data !== '') {
            return res.data;
          }else{
            return '';
          }
        }
      })
      .catch(error => {
        this.$router.push({
          path:'/error',
          query:{
            type:error.bizCode
          }
        })
        //this.$toast(error.message,'bottom');
      })
      return orderNo;
    },
    ...mapMutations({
      setUserInfo: 'SET_USER_INFO',
      setLoading: 'SET_LOADING',
    }),
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  @import "src/common/scss/mixins.scss";
  .init-wrapper{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    bottom: 0;
    background: url('./img_bg.png') no-repeat center center;
    background-size:100% 100%;
    filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='./img_bg.png',sizingMethod='scale');
    .select-nums{
      position: fixed;
      width: 100%;
      height: 100%;
      background-color:rgba(0,0,0,.8);
      top:0;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
      animation: fadeIn .3s  both;
      & ul li{
        border-radius: 100%;
        background: #ffffff;
        float: left;
        margin-right:15px;
        margin-bottom: 20px;
        text-align: center;
        color: #111111;
        position: relative;
        font-size: 20px;
        &.active{
          color: #ffffff;
          background: $badge-red-bg;
        }
        & span{
          width: 100%;
          left: 0;
          position: absolute;
          top:50%;
          transform: translateY(-50%);
        }
      }
      & ul li:nth-child(5n){
        margin-right: 0px;
      }
    }
    .shop-info{
      margin-top: 10px;
      width: 100%;
      background: #ffffff;
      padding:10px 0px 10px 30px;
      .shop-name{
        font-size: 17px;
        color: #111111;
      }
      .user-name{
        margin-top: 15px;
        color: #7b7c88;
      }
    }
    .shop-notice{
      margin-top: 10px;
      padding-left: 20px;
      padding-right: 20px;
      .notice-box{
        border-radius: 5px;
        padding: 20px 20px;
        color: #7b7c88;
        line-height: 24px;
        text-align: center;
        background:rgba(255, 255, 255,0.9);
        & .notice-title{
          position: relative;
          display: inline-block;
          font-size: 18px;
          margin-bottom: 10px;
          & span{
            width: 15px;
            height: 2px;
            background: #7b7c88;
            display: inline-block;
            position: absolute;
            top:50%;
            margin-top: -1px;
            right: -20px;
          }
          &::before{
            position: absolute;
            content: '';
            height: 2px;
            width:8px;
            background: #7b7c88;
            left: -12px;
            top:50%;
            margin-top: -1px;
          }
          &::after{
            position: absolute;
            content: '';
            height: 2px;
            width:8px;
            background: #7b7c88;
            right: -12px;
            top:50%;
            margin-top: -1px;
          }
        }
        & .notice-content{
          text-align: left;
        }
      }
    }
    .fix-bottom{
      position: absolute;
      bottom: 35px;
      width: 100%;
      .start{
        width: 100px;
        height: 100px;
        background: $badge-red-bg;
        border-radius: 100%;
        margin: 0 auto;
        border: 3px solid #ffffff;
        text-align: center;
        line-height: 100px;
        font-size: 16px;
        color: #ffffff;
      }
      .banquan{
        margin-top: 50px;
        text-align: center;
        color: #7b7c88;
      }
    }
    @keyframes fadeIn{
      0%{
          opacity:0;
      }
      100%{
          opacity:1;
      }
    }
  }
</style>

