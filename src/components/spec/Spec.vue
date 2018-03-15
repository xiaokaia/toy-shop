
<template>
  <div class="spec-wrapper" v-show="specFlag">
    <div class="spec-content">
      <div style="margin-bottom:10px">名称：{{ dishdet.goodsName }}</div>
      <div class="close" @click="close">关闭</div>
      <div class="cookie-method group-single" v-if="dishdet.cookingMethods && dishdet.cookingMethods.length">
        <div>做法：</div>
        <ul>
          <li v-for="(item,index) in dishdet.cookingMethods"  :class="{ active : item.active }" @click="cookieMethod(item)" :key="index">{{ item.name }}</li>
        </ul>
      </div>
      <div class="snacks group-single" v-if="dishdet.snacks && dishdet.snacks.length">
        <div>加料：</div>
        <ul>
          <li v-for="(item,index) in dishdet.snacks" :key="index" :class="{ active : item.active }" @click="snacksMethod(item)">{{ item.name }}</li>
        </ul>
      </div>
      <Calculate :count="dishdet.count" :dish="dishdet" :flag="true"></Calculate>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations,mapGetters } from 'vuex'
import { hashCode } from 'utils'
import Calculate from '@/components/calculate/Calculate'

export default {
  data () {
    return {
      cookIndex:0,
    }
  },
  components: {
    Calculate
  },
  computed: {
    ...mapGetters([
      'specFlag',
      'dishdet',
      'speclist',
      'ids',
      'selecteds'
    ]),
  },
  mounted(){
  },
  methods:{
    close(){
      this.changeSpec();
    },
    snacksMethod(obj){
      obj.active = !obj.active;
      let value = 0;
      this.dishdet.snacks.forEach(item => {
        if(item.active === true){
          value += item.id;
        }
      })
      this.setSpecList_2(value);
      this.judgeMethod();
    },
    cookieMethod(obj){
      this.dishdet.cookingMethods.forEach(item => {
        item.active = false;
      });
      obj.active = true;
      this.setSpecList_1(hashCode(obj.name));
      this.judgeMethod();
    },
    judgeMethod(){
      this.dishdet.count = this.selecteds.has(this.ids) ? this.selecteds.get(this.ids).count : 0;
    },
    ...mapMutations({
      changeSpec:'CHANGE_SPEC',
      setDishDet:'SET_DISH_DET',
      setSpecList_1:'SPEC_LIST_1',
      setSpecList_2:'SPEC_LIST_2'
    })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  .spec-wrapper{
    position: fixed;
    z-index: 100;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.4);
    .spec-content{
      width: 90%;
      padding: 10px 10px;
      background-color: #fafafa;
      animation: zoomIn .15s ease forwards;
      .group-single{
        float: left;
        width:100%;
        margin-top: 10px;
        margin-bottom: 10px;
        & ul li{
          float: left;
          padding: 3px 3px;
          border:1px solid #dddddd;
          margin-right: 10px;
          margin-top: 5px;
          &.active{
            border:1px solid red;
            color:red;
          }
        }
      }
    }
  }
</style>

