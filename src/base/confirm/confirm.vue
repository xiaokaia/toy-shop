<template>
  <div class="confirm-container" v-show="showFlag">
    <div class="confirm">
      <div class="confirm-hd">
        <strong class="confirm-title">{{ title }}</strong>
      </div>
      <div class="confirm-bd">{{ text }}</div>
      <div class="confirm-ft">
        <a href="javascript:;" @click="cancel" class="confirm-btn default">取消</a>
        <a href="javascript:;" @click="confirm" class="confirm-btn primary">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:'提示'
    },
    text:{
      type:String,
      default:'内容'
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  mounted(){
  },
  methods:{
    hide(){
      this.showFlag = false;
    },
    show(){
      this.showFlag = true;
    },
    cancel(){
      this.hide()
      this.$emit('cancel')
    },
    confirm(){
      this.hide()
      this.$emit('confirm')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  .confirm-container{
    position: fixed;
    z-index: 20000;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    background:rgba(0,0,0,.4);
    display: flex;
    justify-content: center;
    align-items: center;
    .confirm{
      width: 85%;
      background-color: #fafafa;
      border-radius: 2px;
      font-size: 15px;
      animation: zoomIn .15s ease forwards;
      @keyframes zoomIn {
        from {
          opacity: 0;
          transform: scale3d(0.3, 0.3, 0.3);
        }
        50% {
          opacity: 1;
        }
      }
      .confirm-hd {
        text-align: left;
        padding: 15px 20px 5px;
        .confirm-title {
          font-weight: 400;
          color: #444;
          word-break: break-all;
        }
      }
      .confirm-bd {
        text-align: left;
        padding: 0 20px;
        font-size: 14px;
        color: #888;
        line-height: 20px;
        word-break: break-all;
      }
      .confirm-ft {
        position: relative;
        line-height: 40px;
        margin-top: 14px;
        display: -webkit-box;
        display: flex;
        & a.primary{
          color: #e31436;
        }
        & a{
          position: relative;
          text-align: center;
          display: block;
          flex: 1;
          padding: 0 2px;
        }
        & a:not(:last-child):after{
          content: "";
          position: absolute;
          z-index: 0;
          top: 0;
          right: 0;
          height: 100%;
          border-right: 1px solid #d9d9d9;
          transform: scaleX(.5);
          transform-origin: 0 0;
        }
      }
      .confirm-ft:after {
        content: "";
        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;
        width: 100%;
        border-top: 1px solid #d9d9d9;
        transform: scaleY(.5);
        transform-origin: 0 0;
      }
    }
  }
</style>

