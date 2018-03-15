<template>
  <div class="coupon-wrapper">
    <div class="nav">
      <ul>
        <li :class="{ active: currentIndex === index }" v-for="(item,index) in menuData" :key="index" @click="change(index)">{{ item }}</li>
      </ul>
    </div>
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import test1 from '@/components/coupon/A'
import test2 from '@/components/coupon/B'
import test3 from '@/components/coupon/C'
export default {
    data() {
      return {
        currentIndex:0,
        currentComponent:'test1',
        menuData:[
          '未使用',
          '已使用',
          '已过期'
        ]
      }
    },
    watch: {
    },
    components: {
      test1,
      test2,
      test3
    },
    mounted() {
    },
    created (){
    },
    methods:{
      change(index){
        this.currentIndex = index;
        if(index === 0){
          this.currentComponent = 'test1';
        }else if(index === 1){
          this.currentComponent = 'test2';
        }else if(index === 2){
          this.currentComponent = 'test3';
        }
      }
    },
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  .coupon-wrapper{
    position: relative;
    padding: 10px;
    .nav{
      position: relative;
      float: left;
      width: 100%;
      margin-bottom: 10px;
      & ul li{
        float: left;
        margin-right: 10px;
        &.active{
          color:red;
        }
      }
    }


  }
</style>
