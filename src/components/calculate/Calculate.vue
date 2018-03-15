<template>
  <div class="cal-wrapper" :data="count">
    <div  v-if="(dish.skuType === 'NONE' && ((!dish.cookingMethods || !dish.cookingMethods.length)  && (!dish.snacks || !dish.snacks.length)))  || flag || iscart">
      <div class="count-box" v-if="count > 0 && !isindex" >
        <div class="cal-button dec"  @click.stop="dec" v-fb="{cls:'active'}"></div>
        <div class="text">{{ count }}</div>
        <div class="cal-button add" value="+" @click.stop="add" v-fb="{cls:'active'}"></div>
      </div>
      <div class="count-box" v-else-if="count > 0 && isindex">
        <span class="count-text" v-fb="{cls:'active'}" @click.stop="add">{{ count }}</span>
      </div>
      <div class="count-none"  @click.stop="add" v-else></div>
    </div>
    <div @click.stop="selectedMethod" v-else>
      <a class="count-none" v-fb="{cls:'active'}"></a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations,mapGetters,mapState } from 'vuex'
import apiUrl from 'common/js/api'
import { hashCode,exceptMessage } from 'utils'
import Vue from 'vue'

export default {
  props:{
    iscart:{
      type:Boolean,
      default:false
    },
    isindex:{
      type:Boolean,
      default:false
    },
    flag:{
      type:Boolean,
      default:false
    },
    dish:{
      type:Object
    },
    count:{
      type:Number,
      default:0
    }
  },
  data () {
    return {
    }
  },
   components: {
  },
  computed: {
    ...mapState([
      'selectArray',
    ]),
    ...mapGetters([
      'spec',
      'dishdet',
      'speclist',
      'selecteds',
      'ids'
    ])
  },
  mounted(){

  },
  methods:{
    selectedMethod(){
      this.$emit('intoDish',this.dish);
      /*this.$http.get(apiUrl.getGoodsById+'/'+this.dish.id).then(res => {
        if(res.code === 1){
          this.changeSpec();
          Vue.set(res.data,'count',0);
          this.setDishDet(res.data);
          this.setSpec();
        }
      })
      .catch(error => {
        this.$toast(error.message,'bottom');
      })*/
    },
    setSpec(){
      let specSelected = 0;
      if(this.dishdet.cookingMethods && this.dishdet.cookingMethods.length){
        this.dishdet.cookingMethods.forEach((item,index) => {
          if(index === 0){
            specSelected = hashCode(item.name);
          }
        });
      }
      this.setSpecList_0(this.dishdet.id);
      this.setSpecList_1(specSelected);
      this.setSpecList_2('0');
      if(this.selecteds.has(this.ids)){
        this.dishdet.count = this.selecteds.get(this.ids).count;
      }
    },
    getDishDesc(){

    },
    add(){
      if(this.validateMethods()){//通过验证
        this.$store.commit('add',this.dish);
      }
    },
    dec(){
      this.$store.commit('remove',this.dish);
    },
    validateMethods(){
      if(this.dish.sellState  === 'SELL_OUT'){
        this.$toast(exceptMessage('SELLOUT_ERROR'),'bottom');
        return false;
      }else if(this.dish.calcPriceMethod.calcMethod === 'WEIGHT'){
        this.$toast(exceptMessage('WEIGHT_ERROR'),'bottom');
        return false;
      }else if(this.dishdet.skuType === 'COMPOSE' || this.dishdet.skuType === 'SINGLE'){
        let result = this.dishdet.skuPropertyList.filter(v => v.isId);
        if(result.length != this.dishdet.skuPropertyList.length){
          this.$toast(exceptMessage('SPEC_ERROR'),'bottom');
          return false;
        }
      }else if(this.dishdet.packageType === 'COMPOSE_MORE_SELECT'){
        let count = 0,
            total = 0
        this.dishdet.skuPropertyList.forEach(v => {
          total += v.packageProperty.backSize;
          v.values.forEach(x => {
            if(x.active){
              count++;
            }
          })
        })
        if(total != count){
          this.$toast(exceptMessage('FULL_GROUP_ERROR'),'bottom');
          return false;
        }
      }else if(this.dishdet.packageType === 'DOUBLE_ANY'){
        let result = this.dishdet.skuPropertyList[0].values.filter(v => v.active);
        if(result.length !== 2){
          this.$toast(exceptMessage('EVERY_ERROR'),'bottom');
          return false;
        }
      }
      return true;
    },
    ...mapMutations({
      changeSpec: 'CHANGE_SPEC',
      setDishDet: 'SET_DISH_DET',
      setSpecList_0: 'SPEC_LIST_0',
      setSpecList_1: 'SPEC_LIST_1',
      setSpecList_2: 'SPEC_LIST_2'
    })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  @import "src/common/scss/mixins.scss";
  .cal-wrapper{
    float: right;
    .cal-bottom{
      display: inline-block;
      width: 30px;
      height: 30px;
    }
    .text{
      padding-left: 10px;
      padding-right: 10px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      float: left;
    }
    .count-text{
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 100%;
      border: 1px solid $badge-red-bg;
      color:$badge-red-bg;
      line-height: 30px;
      text-align: center;
      &.active{
        background: $badge-m-tap-red-bg;
      }
    }
    .cal-button{
      width: 30px;
      height: 30px;
      border: none;
      color: #ffffff;
      border-radius:5px;
      font-size: 18px;
      display: inline-block;
      text-align: center;
      line-height: 30px;
      position: relative;
      float: left;
      &.add{
        background: $badge-red-bg;
        &.active{
          background: $badge-tap-red-bg;
        }
        &::before{
          content: '';
          position: absolute;
          width: 16px;
          left:7px;
          top:14px;
          border-top:2px solid #ffffff;
        }
        &::after{
          content: '';
          position: absolute;
          height: 16px;
          left:14px;
          top:7px;
          border-left:2px solid #ffffff;
        }
      }
      &.dec{
        border: 1px solid $badge-red-bg;
        color: $badge-red-bg;
        &.active{
          background: $badge-m-tap-red-bg;
        }
        &::before{
          content: '';
          position: absolute;
          width: 16px;
          left:7px;
          top:14px;
          border-top:2px solid $badge-red-bg;
        }
      }
    }
    .count-none{
      width: 30px;
      height: 30px;
      display: block;
      background: url('./icon_gwc_small.png') no-repeat center center;
      background-size:18px 18px;
      border-radius:5px;
      background-color: $badge-red-bg;
      &.active{
        background-color: $badge-tap-red-bg;
      }
    }
  }
</style>

