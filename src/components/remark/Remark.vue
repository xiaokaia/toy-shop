
<template>
  <div class="remark-content" v-show="isShow">
    <div class="remark-box">
      <div class="remark-title">
        <span class="button left-arr" @click="changeRemark('left')" v-show="currentIndex !== 1"></span>
        <span class="button right-arr" @click="changeRemark('right')" v-show="dish.count !== currentIndex"></span>
        <span class="current-num">{{ currentIndex }}</span>
        <span class="total-num">/ {{ dish.count }}</span>
      </div>
      <div class="taste-list">
        <h4>品味偏好</h4>
        <div class="taste-box">
          <ul>
            <li v-for="(item,index) in currentDish.remark" :class="{ active : item.active }" :key="index" v-if="index < 6" @click="bindTaste(item)"><span>{{ item.name }}</span></li>
          </ul>
        </div>
      </div>
      <div class="remark-text">
        <h4>备注</h4>
        <div class="content">
          <textarea v-model="currentDish.udefined"></textarea>
        </div>
      </div>
      <div class="packge">
        <h4 :class="{ active: currentDish.packStatus }" @click="packgeMethod">打包</h4>
      </div>
      <div class="complete" @click="completeMethod">完成</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState,mapGetters,mapMutations } from 'vuex'
export default {
  props:{
    isShow:{
      type:Boolean,
      default:false
    },
    dish:{
      type:Object,
    },
  },
  data () {
    return {
      packStatus:false,
      currentIndex:1,
      currentDish:{},
    }
  },
  watch:{
    isShow(val){
      if(val){
        this.currentIndex = 1;
        if(this.dish.child && this.dish.child.length){
          this.currentDish = this.dish.child[0];
        }
      }
    }
  },
  components: {

  },
  computed: {
    ...mapGetters([
      'selecteds',
    ]),
  },

  mounted(){
  },
  methods:{
    changeRemark(type){
      if(type === 'left'){
        this.currentIndex--;
      }else if(type === 'right'){
        this.currentIndex++;
      }
      this.currentDish = this.dish.child[this.currentIndex - 1];
    },
    packgeMethod(){
      this.currentDish.packStatus = !this.currentDish.packStatus;
    },
    completeMethod(){
      this.$emit('close');
    },
    bindTaste(item){
      item.active = !item.active;
    }

  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  @import "src/common/scss/mixins.scss";
  .remark-content{
    position: fixed;
    z-index: 99999;
    top:10%;
    width: 80%;
    background: #ffffff;
    border-radius: 5px;
    left:50%;
    margin-left: -40%;
    .remark-box{
      .remark-title{
        position: relative;
        text-align: center;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #f9f9f9;
        border-radius: 5px;
        .button{
          width: 0;
          height: 0;
          position: absolute;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          top:17px;
          &.left-arr{
            left:30px;
            border-right: 10px solid $badge-gray-bg;
          }
          &.right-arr{
            right:30px;
            border-left: 10px solid $badge-gray-bg;
          }
        }
        .current-num{
          color: $badge-black-bg;
          font-size: 20px;
        }
        .total-num{
          color: $badge-gray-bg;
        }
      }
      .taste-list{
        margin-top: 20px;
        margin-bottom: 15px;
        text-align: center;
        position: relative;
        overflow: hidden;
        & h4{
          margin-bottom: 15px;
          font-size: 15px;
        }
        .taste-box{
          padding-left: 10px;
          padding-right: 10px;
          & ul li{
            width: 33.333%;
            float: left;
            padding: 5px 5px;
            line-height: 30px;
            color: #7b7c88;
            & span{
              background: $badge-default-bg;
              width: 100%;
              display: block;
              height: 30px;
              border-radius: 5px;
              @include text-overflow(center);
            }
            &.active span{
              border: 1px solid $badge-blue-bg;
              color:$badge-blue-bg;
              background: #fbfaff;
            }
          }
        }
      }
      .remark-text{
        margin-bottom: 20px;
        & h4{
          text-align: center;
          margin-bottom: 20px;
        }
        & .content{
          padding-left: 15px;
          padding-right: 15px;
          & textarea{
            padding: 15px 15px;
            width: 100%;
            border:1px solid #dfdfe3;
            border-radius: 5px;
            color: #7b7c88
          }
        }
      }
      .packge{
        margin-bottom: 30px;
        margin-left: 15px;
        & h4{
          padding-left: 24px;
          position: relative;
          &::after{
            content: '';
            position: absolute;
            left: 0;
            background: url('./icon_unselected.png') no-repeat center center;
            background-size: 16px 16px;
            width: 16px;
            height: 16px;
          }
          &.active{
            &::after{
              background: url('./icon_selected.png') no-repeat center center;
              background-size: 16px 16px;
            }
          }
        }
      }
      .complete{
        width: 70%;
        margin: 0 auto;
        height: 40px;
        line-height: 40px;
        background: $badge-red-bg;
        color: #ffffff;
        font-size: 16px;
        text-align: center;
        margin-bottom: 20px;
        border-radius: 5px;
      }
    }
  }

</style>

