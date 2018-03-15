<template>
  <div class="loading-container" @touchmove.prevent>
    <div class="loading">
      <div class="loading-icon"></div>
      <div class="loading-txt" v-html="title"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '很快加载好了'
    }
  },
  data () {
    return {
    }
  },
  mounted(){
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  .loading-container{
    position: fixed;
    top:0;
    right: 0;
    left: 0;
    bottom: 0;
    display:flex;
    justify-content: center;
    align-items: center;
    z-index: 999999;
    .loading{
      border-radius: 5px;
      color:#ffffff;
      background-color: rgba(40, 40, 40, .8);
      animation: zoomIn .1s ease forwards;
      display: flex;
      align-items: center;
      padding: 0 23px 0 24px;
      height: 48px;
      .loading-icon{
        width: 28px;
        height: 28px;
        background: url($icon-loading) no-repeat;
        background-size: 28px 28px;
        animation: rotate-loading .45s linear forwards infinite;
        margin-right: 10px;
        @keyframes rotate-loading {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
      .loading-txt{
        font-size: 15px;
        color: #FFF;
        max-width: 140px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
</style>

