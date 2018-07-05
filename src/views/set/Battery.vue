<template>
  <div class="set-wrapper">
    <div class="header">
      <div class="return" @click="returnMethod"></div>
      <span>滤芯寿命</span>
    </div>
    <div class="cell-list">
      <div class="name">滤网一</div>
      <div class="cell-content">
        <div class="progress">
          <div class="trail">
            <span :style="{ width:pw + '%' }">
              <p>
                剩余10000h
              </p>
            </span>
          </div>
        </div>
        <div class="recove" @click="recove">滤网复位</div>
      </div>
    </div>
    <div class="cell-list" style="display:none">
      <div class="name">滤网一</div>
      <div class="cell-content">
        <div class="progress">
          <div class="trail">
            <span :style="{ width:pw + '%' }">
              <p>
                剩余10000h
              </p>
            </span>
          </div>
        </div>
        <div class="recove" @click="recove">滤网复位</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Loading } from 'vue-ydui/dist/lib.rem/dialog';

export default {
  data () {
    return {
     value:'',
     pw:0,
    }
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
    this.pw = 80;
  },
  methods:{
    returnMethod(){
      this.$router.back(-1);
    },
    recove(){
      this.pw = 100;
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  @import "src/common/scss/mixins.scss";
  .set-wrapper{
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
    }
    .cell-list{
      background: #ffffff;
      margin-bottom: 5px;
      padding: 20px 20px 50px 20px;
      .name{
        font-size: 14px;
      }
      .cell-content{
        width: 100%;
        position: relative;
        overflow: hidden;
        .progress{
          float: left;
          width:70%;
          padding-left: 30px;
          padding-top: 50px;
          position: relative;
          .trail{
            width: 100%;
            height: 10px;
            background: #e6e6e6;
            border-radius: 20px;
            position: relative;
            & span{
              position: absolute;
              height: 10px;
              left:0;
              top:0;
              background: #3fa9f5;
              border-radius: 20px;
              transition: width 500ms ease;
              & p{
                position: absolute;
                height: 50px;
                right:-20px;
                top:-40px;
                font-size:16px;
                color: #3fa9f5;
                background: url('../../assets/san.png') no-repeat center top 20px;
                background-size: 20px 18px;
              }
            }
          }
        }
        .recove{
          width: 22%;
          font-size: 12px;
          height: 23px;
          line-height: 23px;
          background: #1fb1fb;
          text-align: center;
          color: #ffffff;
          float: right;
          margin-top: 43px;
          border-radius: 5px;
        }
      }
    }
  }
  
</style>

