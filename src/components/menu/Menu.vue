
<template>
  <div>
    <my-mask v-model="show" @click.native="close"></my-mask>
    <div class="menu-wrapper" :class="classes"  ref="box">
      <div class="menu-content">
        <div ref="content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Mask from 'base/mask/mask';
import { mapMutations } from 'vuex'
export default {
  props:{
    value: {
      type: Boolean,
    },
    closeOnMasker: {
        type: Boolean,
        default: true
    }
  },
  data () {
    return {
      show: this.value
    }
  },
  components: {
    'my-mask':Mask
  },
  computed: {
      classes() {
        return this.show ? 'show' : '';
      },
  },
  watch: {
    value(val){
      this.show = val;
    }
  },
  mounted(){
  },
  methods:{
    close(){
      if (this.closeOnMasker) {
        this.show = false;
        this.setMenu();
      }
    },
    ...mapMutations({
      setMenu: 'SET_MENU',
    })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  .menu-wrapper{
    position: fixed;
    background-color: #f6f6f6;
    z-index: 1501;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    transform: translate(-100%, 0);
    transition: all 0.2s;
    left: 0;
    top: 0;
    width: 70%;
    height: 100%;
    & .menu-content{
      position: relative;
      width: 100%;
      height: 100%;
      & .user-info{
        color: #ffffff;
        padding: 20px 20px;
        background: #242629;
        & .name{
          font-size: 18px;
          margin-bottom: 20px;
        }
        & .center-icon{
          background: url('./icon_Sidebar_arrow.png') no-repeat center right;
          background-size:8px 13px;
          display: inline-block;
          padding-right: 20px;
        }
      }
      & .menu-title{
        color: #7b7c88;
        padding: 15px 0px 15px 20px;
      }
      & .fix-bottom{
        position: fixed;
        z-index: 9;
        padding: 20px 20px;
        background: #f6f6f6;
        bottom: 0px;
        border-top:1px solid #dfdfe3;
        width: 100%;
        color: #111111;
        & .exit{
          float: left;
          width: 25px;
          height: 25px;
          background: url('./icon_Sidebar_back.png') no-repeat center center;
          background-size:25px 25px;
        }
        & .hj{
          font-size: 16px;
          float: right;
          height: 24px;
          line-height: 24px;
          background: url('./icon_bell_big.png') no-repeat center left;
          background-size: 20px 24px;
          padding-left: 30px;
        }
      }
    }
    &.show{
      pointer-events: auto;
      transform: translate(0, 0);
    }
  }

</style>

