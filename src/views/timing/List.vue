<template>
  <div class="timing-wrapper">
    <div class="header">
      <div class="return" @click="returnMethod"></div>
      <span>定时预约</span>
      <span class="edit" @click="save" v-if="isEdit">保存</span>
      <span class="edit" @click="edit" v-else>编辑</span>
    </div>
    <div class="timing-list">
      <div class="list-box">
        <div class="box-left" ref="boxref1">
          <div class="del" style="float:left">删除</div>
          <div class="c-text">
            <p>2小时后关闭</p>
            <p>未命名</p>
          </div>
        </div>
        <div class="box-right" v-if="!isEdit">
          <div class="switch-box">
            <span>定时开</span>
            <yd-switch v-model="switch1"></yd-switch>
          </div>
        </div>
        <div class="box-right" v-else>
          <router-link to="/timingedit"><span>详情</span></router-link>
        </div>
      </div>
    </div>
    <router-link to="/timingedit"><div class="add-timing">添加定时</div></router-link>
  </div>
</template>

<script type="text/ecmascript-6">
import { Switch } from 'vue-ydui/dist/lib.rem/switch';
import { addClass,removeClass } from 'utils/dom';
import { Loading } from 'vue-ydui/dist/lib.rem/dialog';

export default {
  data () {
    return {
     switch1:false,
     switch2:false,
     isEdit:false,
     value:'',
    }
  },
  components: {
    'yd-switch':Switch,
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
    edit(){
      this.isEdit = !this.isEdit;
      this.value = 'active';
      addClass(this.$refs.boxref1,'active');
    },
    save(){
      this.isEdit = !this.isEdit;
      this.value = '';
      removeClass(this.$refs.boxref1,'active');
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  @import "src/common/scss/mixins.scss";
  .timing-wrapper{
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
      .edit{
        position: absolute;
        right:15px;
      }
    }
    .add-timing{
      position: fixed;
      bottom: 15px;
      width: 80%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #ffffff;
      background: #20aaf8;
      left: 50%;
      margin-left: -40%;
      border-radius: 5px;
      font-size: 16px;
    }
    .timing-list{
      .list-box{
        height: 50px;
        background: #ffffff;
        padding-right: 15px;
        display: flex;
        font-size: 14px;
        position: relative;
        margin-bottom: 10px;
        .c-text{
          position: absolute;
          left:80px;
          top:50%;
          transform: translateY(-50%);
        }
        & div{
          flex: 1;
        }
        .box-left{
          position: relative;
          line-height: 18px;
          left:-65px;
          transition-duration: 0.3s;
          transition-timing-function: ease;
          &.active{
            left:0px;
            & .c-text{
              left:65px;
            }
          }
          .del{
            width: 50px;
            height: 50px;
            background: #20aaf8;
            color: #ffffff;
            text-align: center;
            line-height: 50px;
            position: relative;
            display: block;
          }
          & p:nth-child(2){
            font-size: 12px;
            color:#b3b3b3;
          }
        }
        .box-right{
            text-align: right;
            line-height: 50px;
            position: relative;
            .switch-box{
              float: right;
              position: absolute;
              right: 0;
              top:50%;
              transform: translateY(-50%);
              & span{
                position: absolute;
                left: -50px;
                color:#b3b3b3;
                top:-10px;
              }
            }
          }
      }
    }
    
  }
  
  
</style>

