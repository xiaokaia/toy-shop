<template>
  <div class="cart-wrapper">
    <div class="order-top">
      <div class="line-l">
        <p>
          <span>就餐人数</span>
          <span>{{ eatCount }}位</span>
          <span v-show="peopleFlag" v-for="(item,index) in extraCost" :key="index" v-if="item.skuId === -999909">(茶位费 ¥{{ (item.sellPrice / 100).toFixed(2) }}/人)</span>
        </p>
        <p><span>订单备注</span><span class="detailRemak">{{ orderRemak }}</span></p>
      </div>
      <div class="line-r" @click="reviseInfo">修改</div>
    </div>
    <div class="bg-title">
        <p class="titel">已点美食</p>
    </div>
    <div class="order-content">
      <Scroll ref="suggest"
        class="suggest"
        :data="result"
        :pullup="pullup"
        :beforeScroll="beforeScroll"
        @scrollToEnd="searchMore"
      >
        <ul>
          <li v-for="(child,index) in selectArray" :key="index">
            <div class="box-info">
              <p class="goods-name">{{ child.goodsName }}</p>
              <span class="goods-name-E">{{ child.alias }}</span>
              <p class="made">
                <span v-if="child.cookingMethods && child.cookingMethods.length">做法：<span v-for=" (item,index) in child.cookingMethods" :key="index">{{ item.active?item.name : '' }}</span></span>&nbsp;&nbsp;
                <!--规格-->
                <span v-if="child.skuPropertyList && child.skuPropertyList.length" v-for=" (item,index) in child.skuPropertyList" :key="index">
                  <span v-if="item.name">{{ item.name }}:<span v-for="(el,index) in item.values" :key="index"> {{ el.active?el.value : '' }}</span>&nbsp;&nbsp;</span>
                    <!-- 固定双拼 -->
                  <span v-if="child.packageType == 'DOUBLE_FIXED'">
                    <span v-for="(el,index) in item.values" :key="index">{{el.skuPackageValue.goodsName}} {{ index == item.values.length-1?'':'/' }} </span>
                  </span>
                  <!-- 任意双拼 -->
                  <span v-if="child.packageType == 'DOUBLE_ANY'">
                    <span v-for="(el,cindex) in filterValue(item.values)" :key="cindex">
                      <span>
                        <em v-show="el.active">{{el.skuPackageValue.goodsName}}</em>
                        <span v-show="cindex != filterValue(item.values).length-1"> / </span>
                      </span>
                    </span>
                  </span>
                  <!-- 主次套餐 -->
                  <span v-if="child.packageType == 'MASTER_SLAVE'">
                    <span v-for="(el,cindex) in item.values" :data="index" :key="cindex">{{el.skuPackageValue.goodsName}}<em v-if="index === 0 || cindex != item.values.length-1"> / </em></span>
                  </span>
                  <!-- 多选组合套餐 -->
                  <span v-if="child.packageType == 'COMPOSE_MORE_SELECT'">
                    <span v-for="(el,cindex) in filterValue(item.values)" :key="cindex">
                      <span>
                        <em v-show="el.active">{{el.skuPackageValue.goodsName}}</em>
                        <span v-show="cindex != filterValue(item.values).length-1"> / </span>
                      </span>
                    </span>
                  </span>
                </span>
                <span v-if="child.snacks && child.snacks.length" ><span v-if="(isSnack(child.snacks)) > 0">加料：</span></span><span v-for=" (item,index) in child.snacks" :key="index">{{item.active?item.name : ''}}</span>
              </p>
            </div>
            <div class="box-bottom">
              <div class="money">¥{{ toYuan(child.sellPrice) }} <span v-if="child.memberFavorable && child.memberPrice > 0">(会员)</span></div>
              <div class="count-box">
                <Calculate :count="child.count" :dish="child" :iscart="true"></Calculate>
              </div>
            </div>
            <div style="margin-top:10px;">
              <div class="remark-list" v-for="(item,index) in child.child" :key="index" v-show="anyContent(item)">
                <p>
                  备注(第{{ index+1 }}份)：
                  <span class="packge" v-show="item.packStatus">[打包]</span>
                  <span v-for="(list,cindex) in item.remark" :key="cindex" v-if="list.active"> {{ list.name }}</span>
                  <span v-if="item.udefined != ''"> {{ item.udefined }}</span>
                </p>
                <em @click="deleteRemark(item)">删除</em>
              </div>
            </div>
            <div class="box-remark" @click="openRemark(child)">
              <p>备注</p>
            </div>
            <img src="./icon_kanjia.png" alt="" v-if="child.joinedActivityIds && child.joinedActivityIds.length  && (isCanjia(child.joinedActivityIds)).length>0">
          </li>
        </ul>

      </Scroll>
    </div>
    <div class="order-bottom">
      <div class="goods-account">
        <p>
          <span>共<span class="dif"> {{ selectArray.length }} </span>个菜，总计：<span class="dif"> ¥{{ getTotalAmount }} </span></span>
          <span>，有<span class="dif"> {{ cardList.length }} </span>张优惠券</span>
        </p>
      </div>
      <div class="goods-bottom">
        <div v-show="1==2">菜单</div>
        <div @click="goIndex">继续点单</div>
        <div @click="addOrder">下单</div>
      </div>
    </div>
    <div class="cart-mask" v-show="maskFlag" @click="close" @touchmove.prevent></div>
    <div class="revise-content" v-show="dailog">
      <div class="top">
          修改<span v-show="peopleFlag">就餐人数/</span>订单备注
      </div>
      <div class="content">
        <div v-show="peopleFlag">
          <p>就餐人数</p>
          <div class="revise-number">
            <div class="cal-button dec" @click="dec"></div>
            <div class="text">{{ personal }}</div>
            <div class="cal-button add" @click="add"></div>
          </div>
        </div>
        <div class="remark">
          <p>订单备注</p>
          <textarea maxlength="20" v-model="resultRemark"></textarea>
        </div>
        <button class="revise-button" @click="reviseFinish">完成</button>
      </div>
    </div>
    <Remark :isShow="remarkFlag" :dish="dishObj"  @close="close"></Remark>
    <Loading v-show="loadingFlag"></Loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import apiUrl from 'common/js/api'
  import { mapGetters,mapState,mapMutations } from 'vuex'
  import Calculate from '@/components/calculate/Calculate'
  import Remark from '@/components/remark/Remark'
  import Scroll from '@/base/scroll/scroll'
  import Vue from "vue";
  import Loading from 'base/loading/loading'
  import { exceptMessage } from 'utils'
  export default {
    data () {
      return {
        currentIndex:0, //备注下标
        maskFlag:false,
        result:[],
        pullup:true,
        beforeScroll:true,
        peopleFlag:false,
        data:{
          count:3,
          id:1,
          skuType:'NONE'
      },
      extraCost:[],//附加费用
      eatCount:0,
      orderRemak:'',
      personal:null,
      resultRemark:'',
      dailog:false,
      remarkFlag:false,
      dishObj:{},
      //tasteData:[],
      totalAmount:0.00, //应付金额;
      snack:false,
      orderNo:'',
      cardList:[]
    }
  },
  components: {
    Scroll,
    Calculate,
    Remark,
    Loading
  },
  watch:{
  },
  beforeRouteLeave (to, from, next) {
    if(to.name === 'Dish'){
      this.$router.push('/index')
    }
    next();
  },
  created(){
    this.getTaste();
    this.getCardList();
    if(sessionStorage.getItem('nums')){
      this.peopleFlag = true;
      this.eatCount = sessionStorage.getItem('nums');
    }
  },
  computed: {
    getTotalAmount(){
      if(this.selectArray.length){
        return this.calculatePrice();
      }else{
        return 0;
      }
    },
    ...mapState([
      'selectArray',
    ]),
    ...mapGetters([
      'loadingFlag',
    ]),
  },
  mounted(){
  },
  methods:{
    calculatePrice(){
      this.$http.post(apiUrl.calculatePrice,this.getOrderSubmitData()).then(res => {
        if(res.code === 1){
          this.totalAmount = res.data.needAmount;
          this.extraCost = [];
          res.data.orderItems.forEach(v => {
            if((v.skuId == -999909 || v.skuId == -999910) && v.sellPrice > 0){
              this.extraCost.push(v);
            }
          })
        }
      })
      .catch(error => {
        this.$toast(error.message,'bottom');
      })
      return (this.totalAmount / 100).toFixed(2);
    },
    getItemAttrParamList(typeId,typeArray){
      typeId = parseInt(typeId);
      let dataP = {};
      dataP.attrId = typeId;
      dataP.itemAttrValueParamList = [];
      switch(typeId){
        case -88801: //加料
          for(let value of typeArray){
            let dataC = {};
            if(value.active){
              dataC.attrValueId = value.id;
              dataC.attrValueName = value.name;
              dataP.itemAttrValueParamList.push(dataC);
            }
          }
          break;
        case -88802://口味
          for(let value of typeArray){
            let dataC = {};
            dataC.attrValueId = value.merchandiseFlavorId;
            dataC.attrValueName = value.theFlavor;
            dataP.itemAttrValueParamList.push(dataC);
          }
          break;
        case -88803://自定义备注
          let newarray = [];
          newarray = typeArray.split(',');
          for(let value of newarray){
            let dataC = {};
            dataC.attrValueId = -77703;
            dataC.attrValueName = value;
            dataP.itemAttrValueParamList.push(dataC);
          }
          break;
        case -88804://做法
          for(let value of typeArray){
            let dataC = {};
            if(value.active){
              dataC.attrValueId = -77704;
              dataC.attrValueName = value.name;
              dataP.itemAttrValueParamList.push(dataC);
            }
          }
          break;
        default :
           return;
      }
      return dataP;
    },
    /**
     * 封装订单数据
     */
    getOrderSubmitData(){
      var data = {
        areaDeskId: sessionStorage.getItem('tableId'),//桌台id

        customDeskNumber:'',//自定义桌牌号
        orderSource:'H5',//订单来源
        orderId:'',//订单ID
        peoples:parseInt(this.eatCount),//就餐人数 没有人数:-1
        remark:this.orderRemak,//订单备注
        wait4Serving:false,//是否叫起 默认false
        itemParamList:[],//美食列表
      };
      if(data.peoples === 0){//无人数
        data.peoples = -1;
      }
      this.selectArray.forEach((item,index) => {
        item.child.forEach((child,cindex) => {
          var dishData = {
            appendDishStatus: false,//是否加菜,默认false，追加菜true
            cartGoodsId:'',//购物车物品Id（暂未实现购物车功能）
            freeDishStatus:false,//是否赠菜
            goodsId:child.id,//商品ID
            itemAttrParamList:[],//商品属性
            merchandiseVersion:child.version,//商品版本号
            nums:child.count,//商品数目
            //packStatus:'UN_PACK',//是否打包
            remark:'',//美食备注
            skuId:child.skuList[0].skuId,//默认拿skuList第一个skuId
            skuValueIds:[],//选中的skuValue的ID列表
            tempName:'',//临时菜名称
            tempPrice:0
          }
          dishData.packStatus = child.packStatus ? 'PACK' : 'UN_PACK';
          if(this.haveRemark(child)){//存在自定义备注
            let str = '';
            child.remark.forEach(v => {
              if(v.active){
                str += v.name + ',';
              }
            })
            if(child.udefined != ''){
              str += child.udefined;
            }else{
              str = str.substring(0,str.length-1);
            }
            dishData.itemAttrParamList.push(this.getItemAttrParamList('-88803',str));
          }
          if(child.cookingMethods){//做法
            dishData.itemAttrParamList.push(this.getItemAttrParamList('-88804',child.cookingMethods));
          }
          if(child.snacks && child.snacks.length){//加料
            dishData.itemAttrParamList.push(this.getItemAttrParamList('-88801',child.snacks));
          }
          if(child.packageType === 'MASTER_SLAVE'){//主次套餐 拿skuList最后一组skuid
            dishData.skuId = child.skuList[child.skuList.length-1].skuId;
          }else if(child.packageType === 'DOUBLE_FIXED'){//固定双拼 拿skuList第一组skuid
            dishData.skuId = child.skuList[0].skuId;
          }else if(child.packageType === 'DOUBLE_ANY' || child.skuType === 'COMPOSE' || child.skuType === 'SINGLE'){//任意双拼，拿skuList的active为true的skuid
            child.skuList.forEach(v => {
              if(v.active){
                dishData.skuId = v.skuId;
              }
          });
          }else if(child.packageType === 'COMPOSE_MORE_SELECT'){//组合型套餐，拿skuList的active为true的skuid
            child.skuPropertyList.forEach(v => {
              v.values.forEach(c => {
                if(c.active){
                  dishData.skuValueIds.push(c.id);
                }
              })
            })
          }
          data.itemParamList.push(dishData);
        })
      })
      return data;
    },
    haveRemark(item){//是否有备注
      let result = item.remark.filter(v => {
        return v.active;
      })
      if(result.length || item.udefined != ''){
        return true;
      }else{
        return false;
      }
    },
    searchMore(){
      this.$refs.suggest.refresh();
    },
    isSnack(arry){
      let result = arry.filter(v => {
        return v.active;
      })
      return result.length;
    },
    isCanjia(arry){
      let result = arry.filter(v=> {
        return v.activityId == 1
      })
      return result.length
    },
    filterValue(arry){
      let result = arry.filter(v => {
        return v.active;
      })
      return result;
    },
    toYuan(number){
      let money = (number/100).toFixed(2);
      return money
    },
    reviseInfo(){
      this.dailog = true;
      this.maskFlag = true;
      this.personal = this.eatCount
      this.resultRemark = this.orderRemak
    },
    close(){
      this.dailog = false;
      this.maskFlag = false;
      this.remarkFlag = false;
    },
    reviseFinish(){
      this.close();
      this.eatCount = this.personal;
      this.orderRemak = this.resultRemark
      sessionStorage.setItem('nums',this.personal);
    },
    dec(){
      if(this.personal >1){
        this.personal--
      }else{
        return
      }
    },
    add(){
      this.personal++
    },
    goIndex(){
      this.$router.push('/index')
    },
    addOrder(){
      if(this.selectArray.length){
        this.setLoading();
        this.$http.post(apiUrl.addOrder,this.getOrderSubmitData()).then(res => {
          if(res.code == 1){
            this.setLoading();
            this.setMap();//清空购物车
            this.orderNo = res.data.orderNo;
            this.$router.push({
              path:'/list',
              query:{
                orderNo:this.orderNo
              }
            })
          }
        }).catch(error => {
          this.setLoading();
          this.$toast(error.message,'bottom');
        })
      }else{
        this.$toast(exceptMessage('ADDORDER_ERROR'),'bottom');
      }
    },
    openRemark(data){
      this.dishObj = data;
      this.maskFlag = true;
      this.remarkFlag = true;
    },
    getTaste(){
      this.setLoading();
      this.$http.get(apiUrl.listAllCategoriesAndGoods).then(res => {
        if(res.code === 1){
          this.setLoading();
          if(res.data && res.data.length){
            res.data.forEach(v => {
              Vue.set(v,'active',false);
            })
          }
          this.selectArray.forEach(s => {
            s.child.forEach(x => {
              if(x.remark.length === 0){
                x.remark = JSON.parse(JSON.stringify(res.data));
              }
            })
          })
        }
      })
      .catch(error => {
        this.setLoading();
        this.$toast(error.message,'bottom');
      })
    },
    anyContent(item){
      let result = [];
      if(item.remark.length){
        result = item.remark.filter(v => {
          return v.active;
        })
      }
      if(result.length || item.udefined != '' || item.packStatus){
        return true;
      }else{
        return false;
      }
    },
    getCardList(){
      let data = {};
      this.$http.post(apiUrl.getCardList,data).then(res => {
        if(res.code === 1){
          if(res.data && res.data.length){
            this.cardList = res.data.filter(v => {
              return !v.isOverTime;
            })
          }
        }
      })
      .catch(error => {
        this.$toast(error.message,'bottom');
      })
    },
    deleteRemark(item){
      item.udefined = '';
      item.packStatus = false;
      item.remark.forEach(v => {
        v.active = false;
      })
    },
    ...mapMutations({
      setLoading: 'SET_LOADING',
      setMap:'SET_NULL'
    })
  }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  @import "src/common/scss/mixins.scss";
  .cart-wrapper{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    background: $badge-default-bg;
  }
  .order-top{
    width: 100%;
    position: fixed;
    top: 0;
    height: auto;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 20px 30px 20px 15px;
    box-shadow: 1px 2px 2px rgba(#dfdfe3,0.5);
    z-index: 9999;
   }
   .line-l{
     width: 70%;
    //  padding-bottom: 20px;
   }
   .line-l p:first-child{
     margin-bottom: 15px;
   }
   .line-l p:nth-child(2){
     @include text-overflow
   }
   .line-l p span:first-child{
     color: #b3b6bd;
     margin-right: 10px;
   }
   .line-l p:first-child span:nth-child(2){
     margin-right: 5px;
     min-height: 70px
   }
   .line-r{
    padding-left: 22px;
    line-height: 45px;
    margin-left: 30px;
    background: url(../../../assets/icon_xiugai.png) no-repeat left top 12px;
    background-size:15px 18px;
   }
   .order-content{
     position: fixed;
     height: 65%;
     width: 100%;
     top: 126px;
     padding: 0 15px;
     @media only screen and (min-device-width: 320px) and (max-device-width: 374px){
       height:60%
      }
   }
    .suggest{
      height: 100%;
      position: relative;
      top:0;
    }
   .bg-title{
     height: 44px;
     line-height: 44px;
     width: 100%;
     position: fixed;
     top:85px;
     z-index:9999;
     background: $badge-default-bg;
   }
   .titel{
     z-index: 9999;
     color: #b3b6bd;
     text-align: center;
     position: relative;
     &::before{
        content: '';
        z-index: 99;
        position: absolute;
        width: 5px;
        height: 1px;
        background: #b3b6bd;
        left: 50%;
        top:50%;
        margin-left: -40px;
     };
     &::after{
        content: '';
        z-index: 99;
        position: absolute;
        width: 5px;
        height: 1px;
        background: #b3b6bd;
        left: 50%;
        top:50%;
        margin-left: 35px;
     }
   }
   ul{
     margin-top: 0px;
     height: auto;

   }
   ul li{
     height: auto;
     background-color: #fff;
     padding-top: 20px;
     position: relative;
     color: #b3b6bd;
     margin-top: 5px;
   }
    .box-info,.box-bottom,.box-remark{
      padding: 0 15px;
    }
    .remark-list{
      padding-left: 15px;
      padding-right: 15px;
      font-size: 12px;
      color: #7b7c88;
      margin-bottom: 2px;
      position: relative;
      & .packge{
        color: $badge-red-bg;
      }
      & em{
        position: absolute;
        right:30px;
        font-size: 14px;
        color: #111111;
        top:0;
        line-height: 35px;
      }
      & p{
        @include text-overflow();
        background: #f6f6f6;
        height: 35px;
        line-height: 35px;
        padding-left: 15px;
        padding-right: 50px;

      }
    }
    .box-remark{
      margin-top: 10px;
      text-align: center;
      color: #000000;
      height: 35px;
      font-size: 14px;
      line-height: 35px;
      border-top: 1px solid #eeeeee;
    }
    ul li img{
      position: absolute;
      right: 0;
      top: 0;
      width: 30px
      }
      .goods-name{
        color: #000000;
        margin-bottom: 5px;
      }
      .made{
        margin: 10px 0;
        font-size: 10px;
        line-height: 15px;
      }
      .box-bottom{
        display: flex;
        justify-content: space-between;
      }
      .money{
        color: #e31436;
        font-size: 13px;
        line-height: 30px;

      }
      .count-box{
        color: #000000
      }
        .text{
          padding-left: 10px;
          padding-right: 10px;
          height: 30px;
          color: #000000;
          line-height: 30px;
          text-align: center;
          float: left;
        }
    .order-bottom{
      height: 90px;
      width: 100%;
      position: fixed;
      bottom: 0;
      z-index:9999
    }
     .goods-account{
       background-color: rgba(#fdf8c1,0.7);
       line-height: 40px;
       font-size: 12px;
       text-align: center;
       border-top: 1px solid #dfdfe3;
     }
      .dif{
        color: #e31436
      }
     .goods-bottom{
       display: flex;
       justify-content: flex-start;
       text-align: center
     }
     .goods-bottom>div:first-child{
       width: 26%;
       line-height: 50px;
       border-top: 1px solid #dfdfe3;
       font-size: 11px;
       background: url(./icon_menu_black.png) no-repeat top 10px center #ffffff;
       background-size: 20px 12px;
       padding-top: 8px;


     }
     .goods-bottom>div:nth-child(2){
        width: 37%;
        line-height: 50px;
        color: #ffffff;
        background-color: #000000;
     }
     .goods-bottom>div:nth-child(3){
        width: 63%;
        line-height: 50px;
        color: #ffffff;
        background-color: #e31416;

     }
     .cart-mask{
       @include mask(9999,.4)
     }
     .revise-content{
       min-height: 57%;
        @media only screen and (min-device-width: 320px) and (max-device-width: 374px){
          height: 61%;
        }
        @media only screen and (min-device-width: 376px) and (max-device-width: 414px){
          height: 50%;
        }
       width: 80%;
       background-color: #fff;
       position: fixed;
       top: 50%;
       margin-top: -50%;
       left: 50%;
       margin-left: -40%;
       border-radius: 5px;
       text-align: center;
       z-index:9999
     }
     .top{
       height: 55px;
       font-size: 16px;
       line-height: 55px;
       background: #f9f9f9;
       margin-bottom: 20px;
       border-radius: 5px;
     }
      .revise-number{
        width: 110px;
        height: 40px;
        text-align: center;
        font-size: 15px;
        margin: 10px auto;
        padding-left: 10px;

      }
      .remark{
        padding: 0 15px
      }
      textarea {
       border-color: #dfdfe3;
        width: 100%;
        height: 60px;
        border-radius: 3px;
        padding: 10px 15px;
        font-size: 15px;
        color: #7b7c88;
        line-height: 18px;
        margin-top: 10px;

      }
      .revise-button{
        margin-top: 25px;
        height: 40px;
        width: 70%;
        background-color: #e31637;
        border: none;
        color: #fff;
        font-size: 16px;
        border-radius: 5px
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
</style>

