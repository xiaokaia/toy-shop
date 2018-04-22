<template>
  <div class="main-wrapper" :class="{ active: isOpen === true }" v-if="deviceObj.pm">
    <div class="header">
      <span>{{ deviceName }}</span>
      <router-link to="set"><span class="edit"></span></router-link>
    </div>
    <div class="but-list">
      <div class="but-group">
        <div class="icon suo"></div>
        <div class="text">童锁</div>
      </div>
      <div class="but-group">
        <div class="icon shop"></div>
        <div class="text">商城</div>
      </div>
      <div class="but-group" @click="onOffMethod">
        <div class="icon close" :class="{ active:isOpen === true  }"></div>
        <div class="text">开关</div>
      </div>
    </div>
    <div class="center">
      <div class="circle-data" :style="{ height:cHeight+'px' }">
        <div class="circle-inner">
          <p>
            PM2.5 <span>良</span>
          </p>
          <p :class="{ active:  isOpen === true}">{{ deviceObj.pm.data }}</p>
        </div>
      </div>
      <div class="temper">
        <div class="t1">
          <p><span>{{ deviceObj.tem.data }}</span>&#176;c</p>
          <p><span style="font-size:16px">温度</span></p>
        </div>
        <div class="t2">
          <p><span>{{ deviceObj.hum.data }}</span>%</p>
          <p><span style="font-size:16px">湿度</span></p>
        </div>
      </div>
      <div class="tip">
        <p>滤芯剩余寿命{{ deviceObj.remain.data }}{{ deviceObj.remain.unit }}</p>
        <p>设备租赁剩余时间{{ deviceObj.screen.data }}{{ deviceObj.screen.unit }}</p>
      </div>
      <div class="b-data">
        <span>CO2 <em>{{ deviceObj.co2.data }}</em> PPM</span>
        <span>TVOC <em>{{ deviceObj.tvoc.data }}</em> mg/m³</span>
        <span>甲醛 <em>{{ deviceObj.hcho.data }}</em> mg/m³</span>
      </div>
    </div>
    <div class="but-list fixed">
      <div class="but-group">
        <router-link to="/timinglist">
          <div class="icon time"></div>
          <div class="text">定时</div>
        </router-link>
      </div>
      <div class="but-group" @click="modeFlag = true">
        <div class="icon model"></div>
        <div class="text">模式</div>
      </div>
      <div class="but-group" @click="speedFlag = true">
        <div class="icon shan"></div>
        <div class="text">风速</div>
      </div>
      <div class="but-group" @click="functionFlag = true">
        <div class="icon menu"></div>
        <div class="text">功能</div>
      </div>
    </div>
    <yd-popup v-model="modeFlag" position="bottom" width="90%">
      <div class="content">
        <div class="title">模式设定</div>
        <div class="list">
          <ul>
            <li v-for="(item,index) in modeData" :key="index" :class="{ active: modeCurrent == index }" @click="sendFunc(index,1)">
              <span>{{ item }}</span>
              <div class="icon"></div>
            </li>
          </ul>
        </div>
      </div>
    </yd-popup>
    <yd-popup v-model="speedFlag" position="bottom" width="90%">
      <div class="content">
        <div class="title">风速设定</div>
        <div class="list">
          <ul>
            <li v-for="(item,index) in speedData" :key="index" :class="{ active: speedCurrent == index }" @click="sendFunc(index,2)">
              <span>{{ item }}</span>
              <div class="icon"></div>
            </li>
          </ul>
        </div>
      </div>
    </yd-popup>
    <yd-popup v-model="functionFlag" position="bottom" width="90%">
      <div class="content">
        <div class="title">其它功能设定</div>
        <div class="list">
          <ul>
            <li v-for="(item,index) in functionData" :key="index" :class="{ active: item[0].value == 1 }" @click="selectFunction(index)">
              <span>{{ item[0].name }}</span>
              <div class="icon"></div>
            </li>
          </ul>
        </div>
      </div>
    </yd-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import { Loading,Toast } from 'vue-ydui/dist/lib.rem/dialog';
import { Popup } from 'vue-ydui/dist/lib.rem/popup';
import myUrl  from 'common/js/api'
import { setWechatTitle } from 'utils'
export default {
  data () {
    return {
      deviceName:'',
      cHeight:200,
      isOpen:false,
      modeFlag:false,//模式设置
      deviceObj:{},
      modeCurrent:null,
      modeData:[],
      speedFlag:false,
      speedCurrent:null,
      speedData:[],
      functionFlag:false,
      functionCurrent:null,
      functionData:[],
    }
  },
  components: {
    'yd-popup':Popup
  },
  created(){
    this.cHeight = window.innerWidth * 0.5;
    if(window.innerWidth === 320){
      this.cHeight = window.innerWidth * 0.45;
    }
    this.getInfoData();
    this.deviceName = sessionStorage.getItem('name');
    setWechatTitle(this.deviceName,'');
  },
  computed: {
  },
  watch: {
  },
  mounted(){
  },
  methods:{
    onOffMethod(){
      this.isOpen = !this.isOpen;
    },
    selectMode(index){
      this.modeCurrent = index;
    },
    selectSpeed(index){
      this.speedCurrent = index;
    },
    selectFunction(index){
      this.functionCurrent = index;
    },
    getInfoData(){
      Loading.open('很快加载好了');
      this.$http.get(myUrl.queryDetailByDeviceId + '?deviceId='+this.$route.query.deviceId).then(res => {
        if(res.code === 200){
          this.deviceObj = res.data;
          this.modeData = this.toArray(res.data.modeItem.choice);
          this.speedData = this.toArray(res.data.windItems[0].choice);
          this.speedCurrent = res.data.windItems[0].value;
          this.modeCurrent = res.data.modeItem.value;
          this.functionData = res.data.funcs
          Loading.close();
        }
      })
      .catch(error =>{
        Loading.close();
      })
    },
    //发送指令
    sendFunc(index,type){
      Loading.open('发送中...');
      let data = {};
      data.deviceId = this.$route.query.deviceId;
      if(type === 1){//模式
        data.funcId = 210;
      }else if(type === 2){//风速
        data.funcId = 280;
      }
      data.value = index;
      this.$http.post(myUrl.sendFunc,data).then(res => {
        if(type === 1){//模式
          this.modeCurrent = index;
        }else if(type === 2){//风速
          this.speedCurrent = index;
        }
        if(res.code === 200){
          Loading.close();  
          Toast({
              mes: '发送成功',
              timeout: 1500,
              icon: 'success'
          });
        }
      })
      .catch(error =>{
        Loading.close();  
      })
    },
    //字符串转数组
    toArray(str){
      let arr = [];
      let newstr = str.split(',');
      for(let i = 0;i<newstr.length;i++){
        arr.push(newstr[i].slice(2))
      }
      return arr;
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  @import "src/common/scss/mixins.scss";
  .main-wrapper{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    background-color: #999999;
    color: #ffffff;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: linear;
    &.active{
      //background-color:-webkit-gradient(linear, 0 0, 0 top, from(#2689ed), to(rgba(30, 79, 251, 0.8))); 
      background-color: #21a6f7;
    }
    .header{
      height: 40px;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      position: relative;
      .edit{
        position: absolute;
        right:15px;
        width: 20px;
        height: 20px;
        top:10px;
        background: url('../../assets/set.png') no-repeat center center;
        background-size:20px 20px;
      }
    }
    .content{
      padding: 20px 15px 20px 15px;
      color: #4d4d4d;
      .title{
        font-size: 16px;
        padding-bottom: 10px;
        border-bottom: 1px solid #dfdfdf;
      }
      .list{
        & ul li{
          font-size: 14px;
          margin-top: 20px;
          .icon{
            float: right;
            margin-right: 5px;
            width: 20px;
            height: 20px;
            border:1px solid #a3a3a3;
            border-radius: 100%;
          }
          &.active{
            .icon{
              background:url('../../assets/select.png') no-repeat center center;
              background-size:20px 20px;
              border:none;
            }
          }
        }
      }
    }
    .center{
      margin-top: 20px;
      .tip{
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        line-height: 22px;
      }
      .b-data{
        margin-top: 10px;
        font-size: 12px;
        text-align: center;
        & span{
          margin-right: 10px;
          & em{
            font-size: 18px;
          }
          &:last-child{
            margin-right: 0px;
          }
        }
      }
      .temper{
        width: 55%;
        margin: 0 auto;
        margin-top:10px;
        position: relative;
        overflow: hidden;
        &::before{
          content: '';
          position: absolute;
          width: 1px;
          height: 30px;
          background: #ffffff;
          left:50%;
          top:10px;
        }
        & div{
          width: 60px;
          text-align: center;
          font-size:14px;
          line-height: 24px;
          & span{
            font-size: 16px;
          }
        }
        .t1{
          float: left;
        }
        .t2{
          float: right;
        }
      }
      .circle-data{
        width: 50%;
        border:1px solid #ffffff;
        border-radius: 100%;
        @media (device-height:568px) and (-webkit-min-device-pixel-ratio:2){
            width: 45%;
        }
        margin: 0 auto;
        .circle-inner{
          width: 95%;
          height: 100%;
          border: 1px solid #ffffff;
          border-radius: 100%;
          margin: 0 auto;
          text-align:  center;
          & p:nth-child(1){
            margin-top: 40px;
            font-size: 24px;
          }
          & p:nth-child(2){
            font-size: 500%;
            font-weight: 600;
            color: #d86e5d;
            margin-top: 10px;
            letter-spacing:5px;
            transition-property: color;
            transition-duration: 0.3s;
            transition-timing-function: linear;
            @media (device-height:568px) and (-webkit-min-device-pixel-ratio:2){
              font-size: 300%;
            }
            &.active{
              color: #5ddb5d;
            }
          }
        }
      }
    }
    .but-list{
      margin-top: 20px;
      display: flex;
      text-align: center;
      font-size:14px;
      @media (device-height:568px) and (-webkit-min-device-pixel-ratio:2){
        margin-top: 10px;
      }
      &.fixed{
        position: fixed;
        bottom: 10px;
        width: 100%;
      }
      .but-group{
        flex: 1;
        & .icon{
          width: 35px;
          height: 35px;
          border:1px solid #ffffff;
          border-radius: 100%;
          margin: 0 auto;
          margin-bottom: 5px;
          &.suo{
            background: url('../../assets/suo.png') no-repeat center center;
            background-size: 15px 20px;
          }
          &.shop{
            background: url('../../assets/cart.png') no-repeat center left 7px;
            background-size: 23px 18px;
          }
          &.close{
            background: url('../../assets/close.png') no-repeat center center;
            background-size: 18px 21px;
            background-color:#20a8f8;
            border:none;
            &.active{
              border:1px solid #ffffff;
            }
          }
          &.time{
            background: url('../../assets/zhong.png') no-repeat center center;
            background-size: 21px 20px;
          }
          &.model{
            background: url('../../assets/modle.png') no-repeat center center;
            background-size: 17px 15px;
          }
          &.shan{
            background: url('../../assets/shan.png') no-repeat center top 6px;
            background-size: 22px 20px;
          }
          &.menu{
            background: url('../../assets/menu.png') no-repeat center center;
            background-size: 18px 16px;
          }
        }
      }
    }
  }
  


  
</style>

