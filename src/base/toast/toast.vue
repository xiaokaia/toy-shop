<template>
  <div class="toast-container">
    <div class="toast">
      <div class="content">{{ mes }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    mes: String,
    timeout: Number,
    callback: Function
  },
  data () {
    return {
    }
  },
  mounted(){
  },
  methods:{
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  .toast-container{
    position: fixed;
    z-index: 2000;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .toast{
      min-width: 130px;
      max-width: 80%;
      padding-top: 10px;
      background: rgba(40, 40, 40, .8);
      text-align: center;
      border-radius: 3px;
      color: #FFF;
      animation: zoomIn .06s ease forwards;
      .content{
        font-size: 15px;
        padding: 0 10px 10px 10px;
        line-height: 22px;
        word-break: break-all;
      }
    }
  }
</style>

