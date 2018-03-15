<template>
  <div class="notify-container" :class="classes" v-show="showFlag">
    <div class="notify" v-html="text"></div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '顶端加载'
    },
    timeout: {
      type: Number,
      default: 3000
    }
  },
  data () {
    return {
      classes: '',
      timer: null,
      showFlag:false,
    }
  },
  mounted(){
  },
  methods:{
    show(){
      this.showFlag = true;
      this.timer = setTimeout(() => {
        this.hide();
      },this.timeout)
    },
    hide(){
      let _this = this;
      this.classes = 'out';
      setTimeout(() => {
        _this.classes = '';
        _this.showFlag = false;
      },150)
    },
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  .notify-container{
    position: fixed;
    background-color: rgba(40, 40, 40, .8);
    color: #ffffff;
    top:0;
    left: 0;
    right: 0;
    width: 100%;
    z-index:2000;
    font-size: 15px;
    padding: 10px 10px;
    word-break:break-all;
    text-align:center;
    animation: notify-downin .2s linear forwards;
    &.out{
      opacity: 1;
      animation: notify-upout .15s linear forwards;
    }
    @keyframes notify-downin {
      0% {
        opacity: 0;
        transform: translate3d(0, -50px, 0);
      }
      50% {
        opacity: .5;
      }
      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }

    @keyframes notify-upout {
      0% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: translate3d(0, -50px, 0);
      }
    }
  }
</style>

