<template>
  <div class="timing-wrapper">
    <div class="header">
      <div class="return" @click="returnMethod"></div>
      <span>定时设置</span>
      <span class="edit" @click="save">保存</span>
    </div>
    <div class="timing-form">
      <div class="form-item">
        <span>标签</span>
        <input/>
      </div>
      <div class="form-item time border-none">
        <p>时间</p>
        <yd-datetime type="time" v-model="datetime" slot="right"></yd-datetime>
      </div>
    </div>
    <div class="timing-but">
      <span>开/关</span>
      <div class="but-group">
        <button class="but" :class="{ active : timFlag === true }" @click="timFlag = true">定时开</button>
        <button class="but" :class="{ active : timFlag === false }" @click="timFlag = false">定时关</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';
export default {
  data () {
    return {
      timFlag:false,
      datetime:''
    }
  },
  created(){
    
  },
  components: {
    'yd-datetime':DateTime,
  },
  computed: {
  },
  watch: {
  },
  mounted(){
  },
  methods:{
    save(){
      this.$router.push({
        path:'/timinglist'
      })
    },
    returnMethod(){
      this.$router.back(-1);
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
    .timing-but{
      margin-top: 5px;
      padding: 15px 0px 15px 10px;
      background: #ffffff;  
      font-size: 14px;
      position: relative;
      .but-group{
        float: right;
        right:0px;
        margin-right: 20px;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        .but{
          padding: 3px 10px;
          border: 1px solid #b3b3b3;
          color:#b3b3b3;
          border-radius: 5px;
          margin-left: 5px;
          &.active{
            border: 1px solid #20aaf8;
            color: #20aaf8;
          }
        }
      }
    }
    .timing-form{
      background: #ffffff;
      padding-left: 5px;
      padding-right: 5px;
      font-size: 14px;
      .form-item{
        padding: 15px 0px 15px 10px;
        border-bottom: 1px solid #d9d9d9;
        &.time{
          padding: 10px 0px 20px 10px;
          & p{
            margin-bottom: 10px;
          }
        }
        &.border-none{
          border: none;
        }
        & input{
          border:none;
          margin-left: 10px;
          color: #b3b3b3;
        }
      }
    }
  }
  
</style>

