<template>
  <div class="hello">
    <div class="content">
      <scroll ref="scroll" class="content-wrapper" :data="dataList">
        <ul>
          <li v-for="(item,index) in dataList" :key="index">我是内容</li>
        </ul>
      </scroll>
    </div>
    <div class="menu" @click="setMask" :class="classes">菜单</div>
    <button @click="notifyMethod">弹出notify</button>
    <button @click="confirmMethod">弹出confirm</button>
    <button class="clearfix" @click="totastMethod">弹出totast</button>
    <Loading v-show="loading"></Loading>
    <Notify ref="notify"></Notify>
    <Confirm ref="confirm"></Confirm>
    <menu-list v-model="maskFlag">
      ssss
    </menu-list>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import Notify from 'base/notify/notify'
import Confirm from 'base/confirm/confirm'
import Scroll from 'base/scroll/scroll'
import Menu from '@/components/menu/Menu.vue'
import apiUrl from 'common/js/api'
import { hasClass } from 'utils/dom'
import { mapState,mapGetters,mapMutations } from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
      dataList:[
        '我是内容','我是内容','我是内容','我是内容','我是内容','我是内容','我是内容','我是内容','我是内容','我是内容','我是内容'
      ],
      loading:false,
    }
  },
  computed: {
    ...mapState([
      'maskFlag',
    ]),
    classes() {
      return this.maskFlag ? 'open' : '';
    },
    beforeRouteLeave  (to, from, next) {//离开当前路由,禁止跳转
      next();
    }
  },
  mounted(){
    //this.$toast('我是测试','center');
    //console.log(this.$store);
    setTimeout(() => {

    },20)
    this.$refs.scroll.refresh();
    //this.$toast('我是测试','center');
    //this.$dialog.toast({mes: '你点了确定', timeout: 2000});
    let data = {};
    this.$http.get(apiUrl.advertingList,data).then(res => {
      if(res.code === 1){

      }
    })
    .catch(error => {
      this.$toast(error.message,'bottom');
    })
  },
  watch:{
  },
  methods:{
    notifyMethod(){
      this.$refs.notify.show();
    },
    confirmMethod(){
      this.$refs.confirm.show();
    },
    totastMethod(){
      this.$refs.totast.show();
    },
    ...mapMutations({
      setMask: 'SET_MASK',
    })
  },
  components: {
    Loading,
    Notify,
    Confirm,
    Scroll,
    'menu-list':Menu
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  .content{
    position: fixed;
    width: 100%;
    top:400px;
    bottom: 0px;
    .content-wrapper{
      height: 100%;
      overflow: hidden;
      & ul li{
        width: 100%;
        line-height: 30px;
        font-size: 16px;
        border-bottom: 1px solid #dddddd;
        text-align: left;
        padding-left: 20px;
      }
    }
  }
  h1{
    color:red;
    font-size:$font-size-large-x
  }
  .menu{
    position: fixed;
    z-index:1501;
    transition: transform .2s;
    transform: translate(0%, 0);
    right:0;
    top:50%;
    width: 40px;
    height: 40px;
    border-radius:100%;
    background: red;
    line-height: 40px;
    text-align: center;
    &.open{
      transform: translate(-150px, 0);
    }
  }
</style>

