<template>
  <div class="set-wrapper">
    <div class="header">
      <div class="return" @click="returnMethod"></div>
      <span>设备设置</span>
    </div>
    <div class="set-cell">
      <div class="cell-item border-bottom">
        <div class="cell-left"><span>设备名称</span></div>
        <div class="cell-right"><span>空气净化器</span></div>
      </div>
      <router-link to="/devinfo">
      <div class="cell-item border-bottom">
          <div class="cell-left"><span>设备信息</span></div>
          <div class="cell-right"><span>HK-JIM32</span></div>
      </div>
      </router-link>
      <router-link to="/share">
      <div class="cell-item">
        <div class="cell-left"><span>共享授权</span></div>
      </div>
      </router-link>
      <router-link to="/data">
      <div class="cell-item white">
        <div class="cell-left"><span>数据曲线图</span></div>
        <div class="cell-right"></div>
      </div>
      </router-link>
      <router-link to="/battery">
      <div class="cell-item white">
        <div class="cell-left"><span>滤芯寿命</span></div>
        <div class="cell-right"><span>10000h</span></div>
      </div>
      </router-link>
      <div class="cell-item white">
        <div class="cell-left"><span>固件升级</span></div>
        <div class="cell-right"></div>
      </div>
      <router-link to="/config">
      <div class="cell-item white">
        <div class="cell-left"><span>设备配置</span></div>
        <div class="cell-right"></div>
      </div>
      </router-link>
      <div class="cell-item white">
        <div class="cell-left"><span>联系客服</span></div>
        <div class="cell-right"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Loading } from 'vue-ydui/dist/lib.rem/dialog';

export default {
  data () {
    return {
     switch1:false,
     switch2:false,
    }
  },
  created(){
    Loading.open('很快加载好了');
    setTimeout(() => {
      Loading.close();
    }, 300);
  },
  computed: {
  },
  watch: {
  },
  mounted(){
  },
  methods:{
    returnMethod(){
      this.$router.back(-1);
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  @import "src/common/scss/mixins.scss";
  .set-wrapper{
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    .header{
      height: 40px;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      position: relative;
      .return{
        position: absolute;
        left:0px;
        background: url('../../assets/arr-left.png') no-repeat center center;
        background-size: 8px 16px;
        width: 40px;
        height: 40px;
        display: block;
        top:0px;
      }
    }
    .set-cell{
      margin-top: 10px;
      .cell-item{
        position: relative;
        display: flex;
        overflow: hidden;
        margin-bottom: 20px;
        font-size: 14px;
        &.white{
          background: #ffffff;
          padding-top: 15px;
          padding-bottom: 15px;
          margin-bottom: 10px;
          .cell-right{
            &::after{
              top:16px;
            }
          }
        }
        &.border-bottom{
          padding-bottom: 15px;
          &::after{
            content: "";
            margin-left: 15px;
            position: absolute;
            z-index: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            border-bottom: 1px solid #d9d9d9;
            transform: scaleY(.5);
            transform-origin: 0 0;
          }
        }
        .cell-left{
          padding-left: 15px;
          display: flex;
          align-items: center;
        }
        .cell-right{
          flex: 1;
          justify-content: flex-end;
          text-align: right;
          padding-right: 50px;
          &::after{
            display: block;
            color: #c9c9c9;
            content: '';
            width:8px;
            height: 15px;
            background: url('../../assets/arr-right.png') no-repeat center center;
            background-size:8px 15px;
            position: absolute;
            right:30px;
            top:1px;
          }
          & span{
            color: #999999;
          }
        }
      }
    }
  }
  
</style>

