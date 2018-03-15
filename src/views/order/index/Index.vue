<template>
  <div class="main-wrapper">
    <div class="dinner-wrapper">
      <!--热销推荐-->
      <div class="dinner-list hot" v-if="hotlist && hotlist.length" id="dinner-0">
        <div class="dinner-category">
          <div class="inner">
            <h3>
              <span>热销推荐</span>
              <span class="icon left"></span>
              <span class="icon right"></span>
            </h3>
          </div>
        </div>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in hotlist" :key="index" @click="intoDish(item.goods)">
              <div class="dinner dinner-swiper" :class="{ active : hotlist.length === 1 }">
                <div class="dinner-inner">
                  <div class="dinner-icon" :style="{ height:getHeight(1) + 'px' }">
                    <div v-if="item.mediaId === 0">
                      <img v-if="item.goods.mediaIds && item.goods.mediaIds.length"  v-lazy="getDinnerImg(''+item.goods.mediaIds[0]+'',0)" :style="{ width:100 + '%',height:getHeight(1) + 'px' }"/>
                      <img v-else src="../../../common/image/default.png" :style="{ width:100 + '%',height:getHeight(1) + 'px' }"/>
                    </div>
                    <div v-else>
                      <img v-lazy="getDinnerImg(''+item.mediaId+'',0)" :style="{ width:100 + '%',height:getHeight(1) + 'px' }"/>
                    </div>
                    <div class="hot-level" v-if="item.goods.scoville != 'NONE'">
                      <span v-for="(v,index) in $getHotLever(item.goods.scoville)" :key="index"></span>
                    </div>
                    <div class="tag-list" v-if="item.goods.tags">
                      <ul>
                        <li v-for="(tag,index) in item.goods.tags" v-if="tag.name != '会员价'" :key="index"><span>{{ $cutStr(tag.name,12) }}</span></li>
                      </ul>
                    </div>
                    <div class="limits" v-if="item.goods.sellState === 'SELL_OUT'"><span>已售罄</span></div>
                    <div class="limits" v-if="item.goods.calcPriceMethod.calcMethod == 'WEIGHT'"><span>计重菜</span></div>
                  </div>
                  <div class="dinner-content">
                    <h3>{{ item.goods.goodsName }}</h3>
                    <p class="nick-name" v-if="item.goods.alias">{{ item.goods.alias }}</p>
                    <div class="dinner-bottom">
                      <div class="member-price">
                        <p v-if="item.goods.memberFavorable && item.goods.memberPrice > 0">会员价&nbsp;¥{{ getPrice(item.goods.memberPrice) }}</p>
                        <h4>¥ {{ getPrice(item.goods.sellPrice) }}</h4>
                      </div>
                      <Calculate :count="item.goods.count" :dish="item.goods" :isindex="true"  @intoDish="intoDish"></Calculate>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--特殊类别-->
      <div class="dinner-list spec" v-for="(item,index) in filterSpec(specFoodList)" :id="'dinner-'+(index+firstIndex)" :key="item.name">
        <div class="dinner-category">
          <div class="inner">
            <h3>
              <span>{{ item.name }}</span>
              <span class="icon left"></span>
              <span class="icon right"></span>
            </h3>
          </div>
        </div>
        <div class="dinner-spec" v-for="(child,cindex) in item.list" :key="cindex" @click="intoDish(child)">
          <div class="dinner-icon">
            <img v-if="child.mediaIds && child.mediaIds.length"  v-lazy="getDinnerImg(''+child.mediaIds[0]+'',2)" style="width:100%;height:auto;"/>
            <img v-else src="../../../common/image/default.png" style="width:100%;height:auto;"/>
            <div class="cut-flag" v-if="item.name === '砍价活动'"></div>
            <div class="tag-list" v-if="child.tags">
              <ul>
                <li v-for="(tag,index) in child.tags" v-if="tag.name != '会员价'" :key="index"><span>{{ $cutStr(tag.name,12) }}</span></li>
              </ul>
            </div>
            <div class="hot-level" v-if="child.scoville != 'NONE'">
              <span v-for="(v,index) in $getHotLever(child.scoville)" :key="index"></span>
            </div>
            <div class="limits" v-if="child.sellState === 'SELL_OUT'"><span>已售罄</span></div>
            <div class="limits" v-if="child.calcPriceMethod.calcMethod == 'WEIGHT'"><span>计重菜</span></div>
          </div>
          <div class="dinner-content">
            <div class="dinner-top">
              <h3>{{ child.goodsName }}</h3>
              <p class="nick-name" v-if="child.alias">{{ child.alias }}</p>
              <div class="remark" v-if="child.description">{{ child.description }}</div>
            </div>
            <div class="dinner-bottom">
              <div class="dinner-price">
                <p class="member-price" v-if="child.memberFavorable && child.memberPrice > 0">会员价&nbsp;¥{{ getPrice(child.memberPrice) }}</p>
                <h4>¥ {{ getPrice(child.sellPrice) }}</h4>
              </div>
              <div class="cart">
                <Calculate :count="child.count" :dish="child" :isindex="true"  @intoDish="intoDish"></Calculate>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--普通类别-->
      <div class="dinner-list" v-for="(item,index) in dishlist" :id="'dinner-'+(index+secondIndex)" :key="index">
         <div class="dinner-category">
          <div class="inner">
            <h3>
              <span>{{ item.name }}</span>
              <span class="icon left"></span>
              <span class="icon right"></span>
            </h3>
          </div>
        </div>
        <div class="dinner" v-for="(child,cindex) in item.goodsList" :key="cindex" @click="intoDish(child)">
          <div class="dinner-icon" :style="{ width:100 + '%',height:getHeight(2) + 'px' }">
            <img v-if="child.mediaIds && child.mediaIds.length"  v-lazy="getDinnerImg(''+child.mediaIds[0]+'',1)" :style="{ width:100 + '%',height:getHeight(2) + 'px' }"/>
            <img v-else src="../../../common/image/default.png" :style="{ width:100 + '%',height:getHeight(2) + 'px' }"/>
            <div class="cut-flag" v-if="item.name === '砍价活动'"></div>
            <div class="tag-list" v-if="child.tags">
              <ul>
                <li v-for="(tag,index) in child.tags" v-if="tag.name != '会员价'" :key="index"><span>{{ $cutStr(tag.name,12) }}</span></li>
              </ul>
            </div>
            <div class="hot-level" v-if="child.scoville != 'NONE'">
              <span v-for="(v,index) in $getHotLever(child.scoville)" :key="index"></span>
            </div>
            <div class="limits" v-if="child.sellState === 'SELL_OUT'"><span>已售罄</span></div>
            <div class="limits" v-if="child.calcPriceMethod.calcMethod == 'WEIGHT'"><span>计重菜</span></div>
          </div>
          <div class="dinner-content">
            <h3>{{ child.goodsName }}</h3>
            <p class="nick-name" v-if="child.alias">{{ child.alias }}</p>
            <div class="dinner-bottom">
              <div class="member-price">
                <p v-if="child.memberFavorable && child.memberPrice > 0">会员价&nbsp;¥{{ getPrice(child.memberPrice) }}</p>
                <h4>¥{{ getPrice(child.sellPrice) }}</h4>
              </div>
              <div class="cart">
                <Calculate :count="child.count" :dish="child" :isindex="true"  @intoDish="intoDish"></Calculate>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="menu icon"  @click="setMenu"></div>
    <router-link to="/cart"><div class="cart icon"><span class="cart-nums" v-show="selectArray.length">{{ selectArray.length }}+</span></div></router-link>
    <menu-list v-model="menuFlag">
      <div class="user-info">
        <p class="name">Hi,{{ userinfo.nickName }}</p>
        <p class="center-icon"><router-link to="/personal">个人中心</router-link></p>
      </div>
      <div class="menu-title">美食菜单 Menu</div>
      <Scroll ref="scroll" class="menu-list" :data="category">
      <div>
        <ul>
          <li v-for="(item,index) in category" :key="index" @click="selectMenu(index)">
            <div class="img">
              <img v-if="item.mediaIds && item.mediaIds.length"  v-lazy="getDinnerImg(''+item.mediaIds[0]+'',1)" :style="{ width:100 + '%',height:50 + 'px' }"/>
              <img v-else src="../../../common/image/default.png" :style="{ width:100 + '%',height:50 + 'px' }"/>
            </div>
            <div class="menu-name">
              <div class="c-name">{{ item.name }}</div>
              <div class="c-nums">共{{ item.count }}个</div>
            </div>
          </li>
        </ul>
      </div>
      </Scroll>
      <div class="fix-bottom">
        <div class="exit" @click="setMenu"></div>
        <div class="hj">呼叫服务员</div>
        <div class="clearfix"></div>
      </div>
    </menu-list>
    <div class="dish-mask" v-show="maskFlag" @click="close" @touchmove.prevent></div>
    <Loading v-show="loadingFlag"></Loading>
    <Spec></Spec>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import apiUrl from 'common/js/api'
import Loading from 'base/loading/loading'
import { swiperInit } from 'utils/swiper'
import { getImg,cutStr,exceptMessage } from 'utils'
import Calculate from '@/components/calculate/Calculate'
import Spec from '@/components/spec/Spec'
import { mapState,mapGetters,mapMutations } from 'vuex'
import Menu from '@/components/menu/Menu.vue'
import Mask from 'base/mask/mask';
import Scroll from 'base/scroll/scroll'
import Vue from "vue";
import { getHotLever } from 'filters'
Vue.prototype.$getHotLever = getHotLever
Vue.prototype.$cutStr = cutStr

export default {
  data () {
    return {
      category:[],
      hotCategoryList:[],
      specCategoryList:[],
      specFoodList:[],
      num:0,
      firstIndex:0,
      secondIndex:0,
    }
  },
  components: {
    Loading,
    Calculate,
    Spec,
    'menu-list':Menu,
    'my-mask':Mask,
    Scroll
  },
  created(){
    let _this = this;

    //按序执行
    this.setLoading();
    _this.getAdvList(100).then((v) => {
      _this.getCategoryList(200).then((v) => {
        _this.getSpecFood(200,v);
        _this.getCategoryList(1).then((v) => {
          _this.getSpecFood(1,v);
          _this.getCategoryList(2).then((v) => {
            _this.getSpecFood(2,v);
            _this.getCategoryList(3).then((v) => {
              _this.getSpecFood(3,v);
              _this.getCategoryList(4).then((v) => {
                _this.getSpecFood(4,v);
                _this.getDishList().then((v) => {
                  _this.category.unshift(...this.specCategoryList);
                  this.setLoading();
                })
              })
            })
          })
        })
      })
    })
    //console.log(this.category);
  },
  computed: {
    ...mapState([
      'menuFlag',
      'maskFlag',
      'selectArray'
    ]),
    ...mapGetters([
      'dishlist',
      'hotlist',
      'selecteds',
      'loadingFlag',
      'userinfo'
    ]),
  },
  watch: {
  },
  mounted(){
  },
  methods:{
    filterSpec(array){
      let result = array.filter(v => {
        return v.list && v.list.length;
      })
      this.secondIndex = this.firstIndex + result.length;
      return result;
    },
    setSpecNumber(){
    },
    getDinnerImg(mediaIds,type){
      return getImg(mediaIds,type);
    },
    close(){
      this.$router.back();
      let data = {};
      this.setDishDet(data);
    },
    async getDishList(){
      let res = await this.$http.get(apiUrl.listAllCategoriesAndGoods).then(res => {
        if(res.code === 1){
          if(res.data && res.data.length){
            this.setDishList(res.data);
            return this.getAllcategory(res.data);
          }else{
            return [];
          }
        }
      })
      .catch(error => {
        this.$toast(error.message,'bottom');
      })
      return res;
    },
    getPrice(price){
      return (price / 100).toFixed(2)
    },
    getSpecFood(type,array){
      let data = {};
      data.name = this.getPackgeType(type);
      data.list = array;
     this.specFoodList.push(data);
    },
    getPackgeCategory(obj,type){
      let data = {};
      data.mediaIds = [];
      data.count = 0;
      data.name = this.getPackgeType(type);
      obj.forEach(v => {
        data.count++;
        if(v.mediaIds && v.mediaIds.length){
          data.mediaIds = v.mediaIds;
        }
      })
      this.specCategoryList.push(data);
    },
    getAllcategory(obj){
      obj.forEach(v => {
        let data = {};
        data.name = v.name;
        data.count = 0;
        v.goodsList.forEach(x => {
          data.count++;
          if(x.mediaIds && x.mediaIds.length){
            data.mediaIds = x.mediaIds;
            return;
          }
        })
        this.category.push(data);
      });
    },
    async getAdvList(type){
      let resData = await this.$http.get(apiUrl.advertingList).then(res => {
        if(res.code === 1) {
          if(res.data && res.data.length){
              this.firstIndex = 1;
              this.getPackgeCategory(res.data,type);
              this.setHotList(res.data);
              setTimeout(function(){
                swiperInit();
              },20)
            return res.data;
          }
          else{
            return [];
          }
        }
      })
      .catch(error => {
        this.$toast(error.message,'bottom');
      })
      return resData;
    },
    async getCategoryList(type){
      let url = apiUrl.listGoodsByPackageType+'/'+type;
      if(type === 200){
        url = apiUrl.listBargainGoods;
      }
      let resData = await this.$http.post(url).then(res => {
        if(res.code === 1) {
          if(res.data && res.data.length){
            this.getPackgeCategory(res.data,type);
            return res.data;
          }else{
            return [];
          }
        }
      })
      .catch(error => {
        this.$toast(error.message,'bottom');
      })
      return resData;
    },
    deleteCategory(type){
      this.category.forEach((v,index) => {
        if(v.name == this.getPackgeType(type)){
          this.category.splice(index,1);
        }
      })
    },
    getPackgeType(type){
      switch(type){
        case 100:
          return '热销推荐';
          break;
        case 200:
          return '砍价活动';
          break;
        case 1:
          return '主次套餐';
          break;
        case 2:
          return '组合多选套餐';
          break;
        case 3:
          return '固定双拼套餐';
          break;
        case 4:
          return '任意双拼套餐';
          break;
        default: return '';
      }
    },
    intoDish(item){
      if(item.sellState  === 'SELL_OUT'){
        this.$toast(exceptMessage('SELLOUT_ERROR'),'bottom');
        return false;
      }else if(item.calcPriceMethod.calcMethod == 'WEIGHT'){
        this.$toast(exceptMessage('WEIGHT_ERROR'),'bottom');
        return false;
      }
      this.setDishDet(item);
      this.$router.push({
        path: `/index/${item.id}`
      })
      this.setDish(item);
      this.setMask();
    },
    ...mapMutations({
      setDish: 'SET_DISH',
      setLoading: 'SET_LOADING',
      setDishList: 'SET_DISH_LIST',
      setHotList: 'SET_HOT_LIST',
      setDishDet:'SET_DISH_DET',
      setMenu: 'SET_MENU',
      setMask: 'SET_MASK',
    }),
    getHeight(type){
      let h = 0;
      if(type === 1){
        h = (window.innerWidth * 0.8) * 0.9 * 9 / 16;
      }else if(type === 2){
        h = (window.innerWidth / 2 - 15) * 9 / 16;
      }
      return h;
    },
    selectMenu(index){
      this.setMenu();
      let target = $('#dinner-'+index+'');
      $('body,html').animate({'scrollTop': target.offset().top - 10}, 200)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  @import "src/common/scss/mixins.scss";
  .menu-list{
    position: absolute;
    top:143px;
    bottom: 66px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    height: auto;
    overflow: hidden;
    & ul li{
      width: 100%;
      padding: 15px 15px;
      background: #ffffff;
      margin-bottom: 10px;
      display: flex;
      display: -webkit-flex;
      position: relative;
      & .img{
        flex: 0 0 90px;
        height: 50px;
        margin-right: 15px;
      }
      & .menu-name{
        position: relative;
        width: 100%;
        & .c-name{
          position: absolute;
          top:5px;
          font-size: 16px;
          color: #111111;
        }
        & .c-nums{
          position: absolute;
          bottom: 5px;
          color: #b3b6bd;
        }
      }

    }
    & ul li::after{
      content: '';
      position: absolute;
      bottom: 0px;
      width: 100%;
      box-shadow:0px 2px 5px #dfdfe3;
      height: 1px;
      left: 0;
    }
  }
  .cut-flag{
    position: absolute;
    right: 0;
    top:0;
    width: 40px;
    height: 40px;
    background: url('../../../assets/icon_kanjia.png') no-repeat center center;
    background-size: 40px 40px;
  }
  .tag-list{
    position: absolute;
    top:0;
    left: -5px;
    & ul li{
      width: 100%;
      float: left;
      text-align: left;
      margin-bottom: 15px;
      & span{
        padding: 5px 10px;
        background: $badge-red-bg;
        border-radius: 5px;
        color: #ffffff;
        font-size:13px;
        box-shadow:0px 2px 5px #b3b6bd;
      }
    }
  }

  .swiper-container{
    width:100%;
    -webkit-perspective: 1200px;
    -moz-perspective: 1200px;
    -ms-perspective: 1200px;
    perspective: 1200px;
  }

  .swiper-wrapper{
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
  .swiper-slide {
    width: 80%;
    transform-style: preserve-3d;
  }
  .main-wrapper{
    position: absolute;
    width: 100%;
    min-height: 100%;
    top:0;
    background: $badge-default-bg;
    .dish-mask{
      @include mask();
    }
    .dinner-wrapper{
      position: relative;
      padding-top: 15px;
      .dinner-list{
        position: relative;
        margin-bottom: 15px;
        &.spec{
          margin-bottom: 25px;
        }
        &.hot{
          margin-bottom: 5px;
        }
        .dinner-category{
          width: 85%;
          position: relative;
          overflow: hidden;
          padding: 2px 0px 2px 0px;
          margin:0 auto;
          border-top:2px solid #d8e1f6;
          border-bottom:2px solid #d8e1f6;
          margin-bottom: 10px;
          &::before{
              content: '';
              z-index: 99;
              position: absolute;
              width: 35px;
              height: 35px;
              background: $badge-default-bg;
              left: -25px;
              top:2px;
              transform:rotate(45deg);
            }
          &::after{
            content: '';
            position: absolute;
            width: 35px;
            height: 35px;
            top:2px;
            background: $badge-default-bg;
            right: -25px;
            transform:rotate(45deg);
          }
          .inner{
            background: #d8e1f6;
            position: relative;
            height: 35px;
            line-height: 35px;
            text-align: center;
            color:#8697bf;
            &::before{
              content: '';
            }
            & h3{
              position: relative;
              display: inline-block;
              & .icon{
                position: absolute;
                width: 5px;
                height: 5px;
                background: #8697bf;
                transform:rotate(45deg);
                top:50%;
                margin-top: -2.5px;
                &.left{
                  left:-15px;
                }
                &.right{
                  right:-15px;
                }
              }
              &::before{
                content: '';
                position: absolute;
                left: -60px;
                width: 40px;
                height: 1px;
                top:50%;
                margin-top: -0.5px;
                background: #8697bf;
              }
               &::after{
                content: '';
                position: absolute;
                right: -60px;
                width: 40px;
                height: 1px;
                top:50%;
                margin-top: -0.5px;
                background: #8697bf;
              }
            }
          }
        }
        .dinner{
          width: 50%;
          margin-bottom: 10px;
          display:inline-block;
          vertical-align:top;
          .dinner-icon{
            position: relative;
            text-align: center;
            .limits{
              position: absolute;
              top:0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 99;
              background-color: rgba(0,0,0,0.6);
              & span{
                color: #ffffff;
                font-size: 15px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
              }
            }
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
          .dinner-content{
            position: relative;
            background: #ffffff;
            padding: 15px 10px 20px 10px;
            .nick-name{
              font-size: 13px;
              color:$badge-gray-bg;
              line-height: 16px;
            }
            .dinner-bottom{
              margin-top: 20px;
              height: 30px;
              position: relative;
              overflow: hidden;
              .member-price{
                float: left;
                line-height: 16px;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                & p{
                  color:$badge-red-bg;
                }
              }
            }
          }
        }
        .dinner.dinner-swiper{
          width: 90%;
          padding: 0px 0px 20px 5px !important;
          margin:0 auto;
          &.active{
            width: 100%;
          }
        }
        .dinner.dinner-swiper .dinner-inner .dinner-content::after{
          content: '';
          position: absolute;
          width: 100%;
          height: 14px;
          left:0;
          bottom: 0px;
          z-index: 999;
          box-shadow: 0px 14px 9px 0px rgba(203,208,219,0.7);
        }
        .dinner.dinner-swiper.active .dinner-inner .dinner-content::after{
          box-shadow:none;
        }
        .dinner:nth-child(2n){
          padding: 0px 5px 0px 10px;
        }
        .dinner:nth-child(2n-1){
          padding: 0px 10px 0px 5px;
        }

        .dinner-spec{
          display: flex;
          position: relative;
          background: $badge-white-bg;
          padding: 15px 10px 15px 10px;
          border-bottom:1px solid $badge-m-gray-bg;
          margin-bottom: 10px;
          &::before{
            position: absolute;
            content: '';
            width: 10px;
            height: 1px;
            background: #ffffff;
            bottom: -1px;
            left: 0px;;
          }
          &::after{
            position: absolute;
            content: '';
            width: 10px;
            height: 1px;
            background: #ffffff;
            bottom: -1px;
            right: 0px;;
          }
          .dinner-icon{
            position: relative;
            flex: 0 0 140px;
            margin-right:10px;
            .limits{
              position: absolute;
              top:0;
              left: 0;
              width: 100%;
              height: 79px;
              z-index: 99;
              background-color: rgba(0,0,0,0.6);
              & span{
                color: #ffffff;
                font-size: 15px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
              }
            }
          }
          .dinner-content{
            flex: 1;
            & h3{
              color:#111111
            }
            .dinner-top{
              padding-top: 3px;
              color:$badge-gray-bg;
              font-size: 13px;
              line-height: 18px;
              min-height: 79px;
              & .remark{
                margin-top: 10px;
                line-height: 16px;
              }
            }
            .dinner-bottom{
              margin-top: 5px;
              position: relative;
              overflow: hidden;
              .dinner-price{
                float: left;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                .member-price{
                  color:$badge-red-bg;
                  line-height: 18px;
                  font-weight: 400;
                }
              }
            }
          }
        }
        .dinner-spec:last-child{
          border: none;
        }
      }
    }
    .icon{
      position: fixed;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius:100%;
      bottom: 20px;
      &.menu{
        left:10px;
        z-index: 99;
        background: url('./icon_menu_white.png') no-repeat center center;
        background-size:17px 17px;
        background-color: rgba($color: #3b424a, $alpha: 0.9);
      }
      &.cart{
        z-index:1502;
        right:10px;
        background: url('./icon_gwc_big.png') no-repeat center center;
        background-size:17px 17px;
        background-color: rgba($color: #3b424a, $alpha: 0.9);
        .cart-nums{
          font-size: 12px;
          position: absolute;
          width: 30px;
          height: 18px;
          text-align: center;
          line-height: 18px;
          background: $badge-red-bg;
          border-radius:10px;
          color: #ffffff;
          top:-5px;
          right:-5px;
        }
      }
    }
  }
</style>

