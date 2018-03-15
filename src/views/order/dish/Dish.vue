<template>
  <transition name="fade">
    <Scroll ref="scroll" class="dish-wrapper" :data="dishdet.categories || dishdet.skuPropertyList">
      <div class="dish-content">
        <div class="dish-tag-list" v-if="dishdet.tags">
          <ul>
            <li v-for="(tag,index) in dishdet.tags" v-if="tag.name != '会员价'" :key="index"><span>{{ $cutStr(tag.name,12) }}</span></li>
          </ul>
        </div>
        <div class="dish-name">
          <h4>{{ dishdet.goodsName }}</h4>
          <p class="dish-nick-name" v-if="dishdet.alias">{{ dishdet.alias }}</p>
        </div>
        <div class="dish-image">
          <img v-if="dishdet.mediaIds && dishdet.mediaIds.length" :src="getDinnerImg(''+dishdet.mediaIds[0]+'',3)" style="width:100%;height:auto;"/>
          <img v-else src="../../../common/image/default.png" style="width:100%;height:auto;"/>
          <div class="hot-level" v-if="dishdet.scoville != 'NONE'">
            <span v-for="(v,index) in $getHotLever(dishdet.scoville)" :key="index"></span>
          </div>
        </div>
        <div class="dish-remark" v-if="dishdet.description">
          {{ dishdet.description  }}
        </div>
        <div class="special-box">
          <!--做法-->
          <div class="cookie-method group-single" v-if="dishdet.cookingMethods && dishdet.cookingMethods.length">
            <div class="name"><span>做法</span></div>
            <div class="content">
              <ul>
                <li v-for="(item,index) in dishdet.cookingMethods"  :class="{ active : item.active }" @click="cookieMethod(item)" :key="index">{{ item.name }}</li>
              </ul>
            </div>
          </div>
          <!--加料-->
          <div class="cookie-method group-single" v-if="dishdet.snacks && dishdet.snacks.length">
            <div class="name"><span>加料</span></div>
            <div class="content">
              <ul>
                <li v-for="(item,index) in dishdet.snacks"  :class="{ active : item.active }" @click="snacksMethod(item)" :key="index">{{ item.name }}</li>
              </ul>
            </div>
          </div>
          <!--规格-->
          <div class="cookie-method group-single" v-for="(item,index) in dishdet.skuPropertyList" :key="index" v-if="dishdet.skuType === 'COMPOSE' || dishdet.skuType === 'SINGLE'">
            <div class="name"><span>规格-{{ item.name }}</span></div>
            <div class="content">
              <ul>
                <li v-for="(child,cindex) in item.values"  :class="{ active :  item.isCur ===  cindex}" @click="specMethod(item,child,index,cindex)" :key="cindex">{{ child.value }}</li>
              </ul>
            </div>
          </div>
          <!--主次套餐-->
          <div class="cookie-method group-single" v-if="dishdet.packageType === 'MASTER_SLAVE'">
            <div class="name"><span>套餐包含的内容</span></div>
            <div class="content main-sec-packge">
              <div class="packge-box" v-for="(item,index) in dishdet.skuPropertyList" :key="index">
                <dl>
                  <dd v-for="(child,pindex) in item.values" :key="pindex">{{ child.skuPackageValue.goodsName }}</dd>
                </dl>
              </div>
            </div>
          </div>
          <!--组合套餐-->
          <div class="cookie-method group-single" v-for="(item,index) in dishdet.skuPropertyList" :key="index" v-if="dishdet.packageType === 'COMPOSE_MORE_SELECT'">
            <div class="name"><span>{{ item.name }}</span></div>
            <div class="totast">({{ item.packageProperty.frontSize }}选 {{ item.packageProperty.backSize }})</div>
            <div class="content">
              <ul>
                <li v-for="(child,cindex) in item.values"  :class="{ active:  child.active === true}" @click="groupMethod(item,child,index,cindex)" :key="cindex">{{ child.skuPackageValue.goodsName }}</li>
              </ul>
            </div>
          </div>
          <!--任意双拼套餐-->
          <div class="cookie-method group-single" v-for="(item,index) in dishdet.skuPropertyList" :key="index" v-if="dishdet.packageType === 'DOUBLE_ANY'">
            <div class="name"><span>可选内容</span></div>
            <div class="content every-select">
              <ul>
                <li v-for="(child,cindex) in item.values"  :class="{ active :  child.active ===  true}" @click="allSelectMethod(item,child,index,cindex)" :key="cindex">{{ child.skuPackageValue.goodsName }}</li>
              </ul>
            </div>
          </div>
          <!--固定双拼套餐-->
          <div class="cookie-method group-single" v-for="(item,index) in dishdet.skuPropertyList" :key="index" v-if="dishdet.packageType === 'DOUBLE_FIXED'">
            <div class="content every-select">
              <ul>
                <li :key="index">{{ item.values[0].skuPackageValue.goodsName }} 拼 {{ item.values[1].skuPackageValue.goodsName }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="dish-bottom">
        <div class="dish-member-price">
          <p class="member-price" v-if="dishdet.memberFavorable && dishdet.memberPrice > 0">会员价&nbsp;¥{{ getPrice(dishdet.memberPrice) }}</p>
          <h4>¥{{ calculatePrice }}</h4>
        </div>
        <Calculate :count="dishdet.count" :dish="dishdet" :flag="true" v-if="dishdet.skuType != 'NONE' ||  (dishdet.cookingMethods && dishdet.cookingMethods.length) || (dishdet.snacks && dishdet.snacks.length)"></Calculate>
        <Calculate :count="dish.count" :dish="dishdet"  v-else></Calculate>
      </div>
    </Scroll>
      <!--<Spec></Spec>-->
      <!--<Loading v-show="loadingFlag"></Loading>-->
  </transition>
</template>

<script type="text/ecmascript-6">
import apiUrl from 'common/js/api'
import Loading from 'base/loading/loading'
import Calculate from '@/components/calculate/Calculate'
import Scroll from 'base/scroll/scroll'
import Spec from '@/components/spec/Spec'
import { mapGetters,mapMutations } from 'vuex'
import Vue from 'vue'
import { hashCode,exceptMessage,getImg } from 'utils'
import { getHotLever } from 'filters'
Vue.prototype.$getHotLever = getHotLever

export default {
  data () {
    return {
      isTrue:false,
    }
  },
  components: {
    Loading,
    Calculate,
    Spec,
    Scroll
  },
  beforeRouteLeave (to, from, next) {
    this.setMask();
    next();
  },
  computed: {
    ...mapGetters([
      'dish',
      'loadingFlag',
      'specFlag',
      'dishdet',
      'speclist',
      'ids',
      'selecteds'
    ]),
    calculatePrice(){
      let price = this.dishdet.sellPrice;

      if(this.dishdet.snacks && this.dishdet.snacks.length){//加料
        this.dishdet.snacks.forEach(v => {
          if(v.active){
            price += v.price;
          }
        })
      }
      if(this.isTrue){
        if(this.dishdet.skuType === "COMPOSE" || this.dishdet.skuType === "SINGLE"){//多规格
          let result = this.dishdet.skuPropertyList.filter(v => v.isId);
          if(result.length === this.dishdet.skuPropertyList.length){//选满重新计价
            let skuProId = 0;
            this.dishdet.skuPropertyList.forEach(v => {
              skuProId += "_" + v.values["" + v.isCur + ""].id;
            })
            this.dishdet.skuList.forEach(x => {
              let skuId = 0;
              x.skuValues.forEach(s => {
                skuId += "_" + s.id;
              });
              if(skuProId === skuId) {
                price += x.sellPrice - this.dishdet.sellPrice;
              }
            })
          }
        }
      }
      return this.getPrice(price);
    }
  },
  created() {
    this.getDishDesc();
  },
  mounted(){
  },
  methods:{
    getDinnerImg(mediaIds,type){
      return getImg(mediaIds,type);
    },
    getPrice(price){
      return (price / 100).toFixed(2)
    },
    getDishDesc(){
      if(!this.dish.id){//刷新页面，进入列表页
        this.setMask();
        this.$router.push('/index')
        return
      }
      this.setLoading();
      this.$http.get(apiUrl.getGoodsById+'/'+this.dish.id).then(res => {
        if(res.code === 1){
          this.setLoading();
          Vue.set(res.data,'count',0);
          this.setDishDet(res.data);
          this.isTrue = true;
          this.setSpec();
        }
      })
      .catch(error => {
        this.setLoading();
        this.$toast(error.message,'bottom');
      })
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
    specMethod(parentObj,childObj,index,cindex){
      Vue.set(parentObj, "isCur", cindex);
      Vue.set(parentObj, "isId", childObj.id);
      let value = 0;
      parentObj.values.forEach((v,z) => {
        if(z === cindex){
          v.active = true;
        }else{
          v.active = false;
        }
      })
      this.dishdet.skuPropertyList.forEach(item => {
        if (item.isId) {
          value += "_" + item.isId;
        }
      });
      this.setSpecList_3(value);
      this.judgeMethod();
    },
    groupMethod(parentObj,childObj,index,cindex){
      if(childObj.active){
        childObj.active = !childObj.active;
      }else{
        let result = this.dishdet.skuPropertyList[index].values.filter(v => v.active);
        if(result.length === parentObj.packageProperty.backSize){
          this.$toast(exceptMessage('GROUP_ERROR',parentObj.packageProperty.backSize),'bottom');
          return false;
        }
        childObj.active = !childObj.active;
        let value = "";
        this.dishdet.skuPropertyList.forEach(v => {
          v.values.forEach(x => {
            if(x.active){
              value += x.id;
            }
          })
        })
        this.setSpecList_3(value);
        this.judgeMethod();
      }
    },
    allSelectMethod(parentObj,childObj,index,cindex){
      if(childObj.active){
        childObj.active = !childObj.active;
      }else{
        let newArr = parentObj.values.filter(x => {
          return x.active;
        })
        if(newArr.length > 1){
          this.$toast(exceptMessage('EVERY_ERROR'),'bottom');
          return false;
        }
        childObj.active = !childObj.active;
        let value = "";
        this.dishdet.skuPropertyList.forEach(v => {
          v.values.forEach(x => {
            if(x.active){
              value += x.id;
            }
          })
        })
        this.setSpecList_3(value);
        this.judgeMethod();
      }
    },
    setSpec(){
      let specSelected = 0;
      if(this.dishdet.cookingMethods && this.dishdet.cookingMethods.length){
        this.dishdet.cookingMethods.forEach((item,index) => {
          if(index === 0){
            item.active = true;
            specSelected = hashCode(item.name);
          }
        });
      }
      this.setSpecList_0(this.dishdet.id);
      this.setSpecList_1(specSelected);
      this.setSpecList_2('0');
      this.setSpecList_3('0');
      if(this.selecteds.has(this.ids)){
        this.dishdet.count = this.selecteds.get(this.ids).count;
      }
    },
    judgeMethod(){
      this.dishdet.count = this.selecteds.has(this.ids) ? this.selecteds.get(this.ids).count : 0;
    },
    ...mapMutations({
      setLoading: 'SET_LOADING',
      setMask:'SET_MASK',
      changeSpec:'CHANGE_SPEC',
      setDishDet:'SET_DISH_DET',
      setSpecList_0: 'SPEC_LIST_0',
      setSpecList_1:'SPEC_LIST_1',
      setSpecList_2:'SPEC_LIST_2',
      setSpecList_3:'SPEC_LIST_3',
    })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  .fade-enter-active, .fade-leave-active{
    animation: fadeInUp .6s  both;
  }
  .fade-enter, .fade-leave-to{
    animation: bounceOutDown .6s  both;
    animation-fill-mode: forwards;
  }
  .dish-wrapper{
    z-index: 1501;
    width: 80%;
    left: 50%;
    margin-left: -40%;
    background: #ffffff;
    max-height: 80%;
    top:5%;
    align-items: center;
    position: fixed;
    overflow: hidden;
    .dish-content{
      padding: 30px 15px 65px 15px;
      .dish-tag-list{
        position: relative;
        width: 100%;
        text-align: center;
        margin-bottom: 10px;
        & ul li{
          display: inline-block;
          padding: 5px 10px;
          background: $badge-red-bg;
          border-radius: 5px;
          color: #ffffff;
          font-size:13px;
          margin-right: 10px;
          box-shadow:0px 2px 5px #b3b6bd;
        }
        & ul li:last-child{
          margin-right: 0px;
        }
      }
      .dish-name{
          text-align: center;
          margin-bottom: 20px;
          .dish-nick-name{
            text-align: center;
            font-size: 14px;
            color:$badge-gray-bg;
            margin-top: 5px;
          }
        }
        .dish-image{
          position: relative;
          .hot-level{
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              bottom: 5px;
              padding: 5px 15px;
              background: #f6faff;
              border-radius: 20px;
              & span{
                width: 5px;
                height: 16px;
                background: url('../../../assets/icon_lajiao_big.png') no-repeat center center;
                background-size: 5px 16px;
                display: block;
                float: left;
                margin-right: 4px;
              }
              & span:last-child{
                margin-right: 0px;
              }
            }
        }
        .dish-remark{
          text-align: center;
          font-size: 13px;
          color: $badge-gray-bg;
          line-height: 17px;
          margin-top: 20px;
        }
        .special-box{
          margin-top: 20px;
          .group-single{
            margin-bottom: 10px;
            .name{
              text-align: center;
              margin-bottom: 10px;
              & span{
                position: relative;
                &::before{
                  content: '';
                  width:8px;
                  height: 2px;
                  position: absolute;
                  left: -15px;
                  background: $badge-black-bg;
                  top:50%;
                  margin-top: -1px;
                }
                &::after{
                  content: '';
                  width:8px;
                  height: 2px;
                  position: absolute;
                  right: -15px;
                  background: $badge-black-bg;
                  top:50%;
                  margin-top: -1px;
                }
              }
            }
            .totast{
              text-align: center;
              margin-bottom: 10px;
            }
            .content{
              width: 100%;
              text-align: center;
              & ul li{
                display: inline-block;
                margin-right: 10px;
                margin-bottom: 10px;
                padding: 10px 10px;
                color:#7b7c88;
                background: $badge-default-bg;
                border: 1px solid $badge-default-bg;
                border-radius: 5px;
                &.active{
                  border: 1px solid $badge-blue-bg;
                  color:$badge-blue-bg;
                  background: #fbfaff;
                }
              }
              & ul li:last-child{
                margin-right: 0px;
              }
              &.every-select{
               & ul li{
                 width: 100%
               }
              }
            }
            .main-sec-packge{
              padding: 10px 10px;
              position: relative;
              overflow: hidden;
              background: #f6faff;
              border-radius: 5px;
              color:#325782;
              line-height: 20px;
              & .packge-box{
                margin-bottom: 10px;
                & dl dd{
                  margin-bottom: 10px;
                }
                & dl dd:last-child{
                  margin-bottom: 0px;
                }
              }
              & .packge-box:last-child{
                margin-bottom: 0px;
              }
            }
          }
          .group-single:last-child{
            margin-bottom: 0px;
          }
        }
    }
    .dish-bottom{
      position: absolute;
      padding-top: 10px;
      z-index: 9;
      bottom: 0;
      width: 100%;
      height: 50px;
      padding-left: 15px;
      padding-right: 15px;
      background: #ffffff;
      .dish-member-price{
        float: left;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        & p{
          color:$badge-red-bg;
        }
      }
    }
  }
  @keyframes bounceOutDown{
    0%{-webkit-transform:translateY(0)}
    20%{opacity:1;-webkit-transform:translateY(-20px)}
    100%{opacity:0;-webkit-transform:translateY(2000px)}
  }
  @keyframes fadeInUp{
    0%{
        opacity:0;
        -webkit-transform:translateY(20px)
    }
    100%{
        opacity:1;
        -webkit-transform:translateY(0)
    }
  }
</style>

