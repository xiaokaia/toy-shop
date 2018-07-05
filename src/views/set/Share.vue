<template>
  <div class="set-wrapper">
    <div class="header">
      <div class="return" @click="returnMethod"></div>
      <span>共享授权</span>
    </div>
    <div class="ewm-content">
      <p>对方扫一扫，可以共享设备</p>
      <img class="ewm" src="../../assets/ewm.png">
      <p class="time">有效期至：2018-6-20 10：20:30</p>
    </div>
    <div class="share-but">分享好友</div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Loading } from 'vue-ydui/dist/lib.rem/dialog';

export default {
  data () {
    return {
     value:'',
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
    },
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
    .share-but{
      margin:0 auto;
      margin-top: 60px;
      width:180px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #ffffff;
      background: #20aaf8;
      border-radius: 5px;
    }
    .ewm-content{
      width: 70%;
      margin: 0 auto;
      margin-top:40px;
      background: #ffffff;
      padding-top: 20px;
      padding-bottom: 20px;
      text-align: center;
      .ewm{
        width: 70%;
        height: auto;
        margin-top: 15px;
      }
      .time{
        color: #999999;
        margin-top: 30px;
      }
    }
  }
  
</style>

