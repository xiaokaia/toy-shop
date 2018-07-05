<template>
  <div></div>
</template>

<script type="text/ecmascript-6">
import myUrl  from 'common/js/api'
import { getQueryString } from 'utils'

export default {
  data () {
    return {
    }
  },
  components: {
  },
  created(){
    this.authMethod();
  },
  computed: {
  },
  watch: {
  },
  mounted(){
  },
  methods:{
    authMethod(){
      let that = this;
      this.$http.get(myUrl.auth + '?code='+getQueryString('code')+'').then(function(res){
         if(res.code === 200){
          sessionStorage.setItem('Ticket',res.data);
          that.$router.push({
              path:'/list',
            })
         }
      })
      .catch(function(error){
        that.$toast(error.msg,'bottom');
      })
    },
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  @import "src/common/scss/mixins.scss";
  


  
</style>

