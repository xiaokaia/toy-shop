<template>
  <div class="set-wrapper">
    <div class="header">
      <div class="return" @click="returnMethod"></div>
      <span>设备配置</span>
    </div>
    <div class="config-wrapper">
      <div class="cell-header">
        <div class="cell-value"><b>配置信息</b></div>
        <div class="cell-value"><b>配置值</b></div>
        <div class="cell-value"><b>默认值</b></div>
      </div>
      <div class="cell-content">
        <div class="cell-txt">风速一档</div>
        <div class="cell-txt">300 RPM</div>
        <div class="cell-txt"></div>
      </div>
      <div class="cell-content">
        <div class="cell-txt">风速一档</div>
        <div class="cell-txt">300 RPM</div>
        <div class="cell-txt"></div>
      </div>
      <div class="cell-content">
        <div class="cell-txt">风速一档</div>
        <div class="cell-txt">300 RPM</div>
        <div class="cell-txt"></div>
      </div>

      <div class="cell-content">
        <div class="cell-txt">风速一档</div>
        <div class="cell-txt">300 RPM</div>
        <div class="cell-txt"></div>
      </div>
    </div>
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
    .config-wrapper{
      position: absolute;
      top:40px;
      bottom: 0px;
      height: auto;
      background: #ffffff;
      left:0;
      width: 100%;
      padding-left: 15px;
        padding-right: 15px;
      .cell-header{
        display: flex;
        border-bottom:1px solid #d9d9d9;
        padding-left: 10px;
        .cell-value{
          flex: 1;
          text-align: left;
          font-size:16px;
          line-height: 40px;
          color: #1fb1fb;
        }
      }
      .cell-content{
        display: flex;
        border-bottom:1px solid #d9d9d9;
        .cell-txt{
          flex: 1;
          text-align: left;
          font-size:12px;
          line-height: 30px;
          padding-left: 10px;
          border-right:1px solid #d9d9d9;
          &:last-child{
            border-right:none;
          }
        }
        &:last-child{
          border-bottom:none;
        }
      }
    }
  }
  
</style>

