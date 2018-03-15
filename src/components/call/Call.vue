
<template>
  <div class="call-wrapper">
    有问题？立即<span>呼叫服务员</span>
  </div>
</template>

<script type="text/ecmascript-6">


export default {
  data () {
    return {

    }
  },
  components: {
  },
  computed: {

  },
  mounted(){
  },
  methods:{
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  .call-wrapper{
    text-align: center;
    color: #7b7c88;
    & span{
      margin-left: 10px;
      color: #325782;
      text-decoration: underline;
    }
  }
</style>

