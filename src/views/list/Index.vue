<template>
  <div class="list-wrapper">
    <yd-accordion style="position: relative;padding-bottom: 50px;" v-if="devGroupList.length">
      <yd-accordion-item :title="item.groupName" open="open" v-for="(item,index) in devGroupList" :key="index">
          <div style="padding:15px 15px;">
            <div class="list-item" @click="intoIndex(child.deviceId,child.deviceName)" @touchstart="gtouchstart" @touchmove="gtouchmove" @touchend="gtouchend" v-for="(child,cindex) in item.deviceItemPos" :key="cindex">
              <div class="item-left">
                <div class="icon" :class="{ active : containIds(child.deviceId) }" v-if="loopValue === true" @click.stop="selectDev(child.deviceId)"></div>
                <div class="img">
                  <div class="p-img"><img :src="child.icon"></div>
                  <div class="img-text">
                    <p>{{ child.deviceName }}</p>
                    <p>ID:{{ child.deviceId }}</p>
                    <p>型号：{{ child.deviceTypeName }}</p>
                  </div>
                </div>
              </div>
              <div class="item-right">
                <span v-if="loopValue === true" @click.stop="OpenDev(child)">编辑</span>
                <p>PM{{ child.pm }}</p>
                <p v-if="1===2">120ug/m³</p>
              </div>
            </div>
            <div v-if="item.deviceItemPos.length === 0">暂无产品</div>
          </div>
      </yd-accordion-item>
    </yd-accordion>
    <div v-else style="padding:10px 10px;">暂无产品</div>  
    <div class="fixed-bottom">
      <div class="group">
        <div class="active"  @click="selctButtonMethod(0)" v-if="!loopValue">扫码添加</div>
        <div class="active" v-else @click="selctButtonMethod(1,'cancel')">取消分组</div>
        <div class="" @click="selctButtonMethod(0,'create')">新建分组</div>
      </div>
    </div>   
    <div class="wx-dialog dialog" v-if="wxValue">
      <div class="confirm">
        <div class="confim-top">
          <p>设备联网提示</p>
          <ul>
            <li><p>1.请打开设备电源</p></li>
            <li><p>2.长按设备上的配置按钮3秒以上</p></li>
            <li><p>3.听到‘滴’声后点击下一步</p></li>
          </ul>
        </div>
        <div class="confim-bottom">
          <div class="but" @click="wxValue = false">取消</div>
          <div class="but">下一步</div>
        </div>
      </div>
    </div>
    <div class="create-dialog dialog" v-if="createValue">
      <div class="confirm">
        <div class="confim-top">
          <textarea class="name" placeholder="在此输入新建分组的名称" v-model="groupName"></textarea>
        </div>
        <div class="confim-bottom">
          <div class="but" @click="createValue = false">取消</div>
          <div class="but create" @click="addGroup">确定</div>
        </div>
      </div>
    </div> 
    <div class="create-dialog dialog" v-if="editDevFlag">
      <div class="confirm">
        <div class="confim-top">
          <textarea class="name" placeholder="在此输入的名称" v-model="devInfo.deviceName"></textarea>
        </div>
        <div class="confim-bottom">
          <div class="but" @click="editDevFlag = false">取消</div>
          <div class="but create" @click="editDev">确定</div>
        </div>
      </div>
    </div>           
  </div>
</template>

<script type="text/ecmascript-6">
import { Loading } from 'vue-ydui/dist/lib.rem/dialog';
import {Accordion, AccordionItem} from 'vue-ydui/dist/lib.rem/accordion';
import myUrl  from 'common/js/api'
import { getQueryString } from 'utils'

export default {
  data () {
    return {
     value:'',
     loop:null,//长按
     loopValue:false,
     select:0,
     wxValue:false,
     createValue:false,
     editDevFlag:false,
     groupName:'',
     devInfo:{},
     devName:'',
     devGroupList:[],
     devIds:[]//选中设备id列表
    }
  },
  components:{
    'yd-accordion':Accordion,
    'yd-accordion-item':AccordionItem
  },
  created(){
    this.getDeviceList();
  },
  computed: {
  },
  watch: {
  },
  mounted(){

  },
  methods:{
    returnMethod(){
      this.$router.back(-1);
    },
    gtouchstart(){
      let that = this;
      that.loop = setTimeout(function(){
        that.loopValue = true;
      },3000)
      return false;
    },
    gtouchmove(){
      clearTimeout(this.loop);//清除定时器
      this.loopValue = false;
    },
    gtouchend(){
      clearTimeout(this.loop);//清除定时器
      if(this.loopValue){

      }
      return false;
    },
    selctButtonMethod(nums,type){
      this.select = nums;
      if(type === 'cancel'){
        this.loopValue = false;
        this.select = 0;
      }else if(type === 'wx'){
        this.wxValue = true;
      }else if(type === 'create'){
        this.createValue = true;
      }
    },
    getDeviceList(){
      Loading.open('很快加载好了');
      this.$http.get(myUrl.obtainMyDevice).then(res => {
        if(res.code === 200){
          Loading.close();
          if(res.data.groupDataList && res.data.groupDataList.length){
            this.devGroupList = res.data.groupDataList;
          }
        }
      })
      .catch(error =>{
        Loading.close();
      })
      return Promise.resolve();
    },
    addGroup(){
      if(this.groupName === null || this.groupName === ''){
        this.$toast('请输入设备组名称','bottom');
        return;
      }

      Loading.open('很快加载好了');
      let data = {
        groupName:this.groupName
      }
      if(this.devIds.length){//选中了设备
        data.deviceIds = this.devIds;
      }
      this.$http.post(myUrl.createGroup,data).then(res =>{
        if(res.code === 200){
          Loading.close();
          this.getDeviceList();
          this.createValue = false;
        }
      })
      .catch(error =>{
        Loading.close();
      })
    },
    OpenDev(obj){
      this.editDevFlag = true;
      this.devInfo = Object.assign({},obj);
    },
    editDev(){
      Loading.open('很快加载好了');
      this.$http.get(myUrl.editDevice+'?deviceId='+this.devInfo.deviceId+'&deviceName='+this.devInfo.deviceName).then(res =>{
        if(res.code === 200){
          Loading.close();
          this.editDevFlag = false;
          this.getDeviceList();
        }
      })
      .catch(error =>{
        Loading.close();
        this.$toast(error.msg,'bottom');
      })
    },
    intoIndex(id,name){
      sessionStorage.setItem('name',name);
      this.$router.push({
        path:'/index',
        query:{
          deviceId:id
        }
      })
    },
    selectDev(id){
      let index = this.devIds.indexOf(id);
      if(index > -1){//找到了
         this.devIds.splice(index,1);
      }else{
        this.devIds.push(id);
      }
    },
    containIds(id){
      return this.devIds.includes(id);
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/scss/variable.scss";
  @import "src/common/scss/mixins.scss";
  .list-wrapper{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #ffffff;
    .none-device{
      padding: 10px 10px;
    }
    .dialog{
      position: fixed;
      z-index: 2000;
      bottom: 0;
      right: 0;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0,0,0,.5);
      .confirm{
        width: 80%;
        background-color: #ffffff;
        border-radius: 5px;
        font-size: 15px;
        animation: zoom-in .15s ease forwards;
        .confim-top{
          padding-top: 20px;
          padding-bottom: 20px;
          background: #2689ee;
          color: #ffffff;
          text-align: center;
          position: relative;
          overflow: hidden;
          .name{
            text-align: left;
            width: 100%;
            padding-left: 15px;
            padding-right:15px;
            background: none;
            float: left;
            border: none;
            color: #93c4f7;
            font-size: 14px;
            min-height: 100px;
          }
          & p{
            line-height: 24px;
            &:nth-child(1){
              font-size: 16px;
              margin-bottom: 5px;
            }
          }
          & ul{
            width: 205px;
            margin:0 auto;
            & li{
              text-align: left;
              & p{
                display: inline-block;
                text-align: left;
                font-size: 14px !important;
                margin-bottom: 0px !important;
              }
            }
          }
        }
        .confim-bottom{
          background: #ffffff;
          padding: 20px 20px;
          position: relative;
          overflow: hidden;
          font-size: 14px;
          .but{
            width: 46%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: 1px solid #2689ee;
            color: #2689ee;
            border-radius: 5px;
            float: left;
            &:nth-child(2){
              float: right;
              &.create{
                background: #2689ee;
                color: #ffffff;
              }
            }
          }
        }
      }
    }
    .fixed-bottom{
      position: fixed;
      bottom: 0px;
      height: 50px;
      line-height: 50px;
      width: 100%;
      font-size: 14px;
      .group{
        position: relative;
        width: 100%;
        font-size: 14px;
        & div{
          width: 50%;
          text-align: center;
          float: left;
          border-top:1px solid #2689ee;
          background: #f7f7fa;
          color:#2689ee;
          &.active{
            background: #2689ee;
            color: #ffffff;
          }
        }
      }
    }
    .list-item{
      position: relative;
      display: flex;
      border-bottom:1px solid #d9d9d9;
      padding-bottom: 5px;
      margin-bottom: 5px;
      .item-left{
        display: flex;
        align-items: center;
        .icon{
          width: 15px;
          height: 15px;
          background: url('../../assets/ju.png') no-repeat center center;
          background-size: 15px 15px;
          margin-right: 5px;
          &.active{
            background: url('../../assets/ju_select.png') no-repeat center center;
            background-size: 15px 15px;
          }
        }
        .img{
          width: 70px;
          height: 70px;
          border:1px solid #d9d9d9;
          border-radius:100%;
          position: relative;
          //overflow: hidden;
          .p-img{
            position: relative;
            width: 70px;
            height: 70px;
            overflow: hidden;
            border-radius: 100%;
            & span{
              position: absolute;
              width: 100%;
              height: 70px;
              bottom:0px;
              text-align: center;
              color: #ffffff;
              background: url('../../assets/bak.png') no-repeat center center;
              background-size:70px 70px;
              line-height: 30px;
              & em{
                position: absolute;
                bottom: -5px;
                text-align: center;
                width:100%;
                left:0;
              }
            }
            & img{
              width: 100%;
              height: auto;
            }
          }
          .img-text{
            position: absolute;
            left:75px;
            top:50%;
            transform: translateY(-50%);
            width:180px;
            color: #666666;
            line-height: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            & p:nth-child(1){
              font-size: 14px;
              margin-bottom: 5px;
              color: #111111;
            }
            & p:nth-child(2){
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .item-right{
        flex: 1;
        line-height: 16px;
        align-items: center;
        justify-content: flex-end;
        text-align: right;
        padding-top: 30px;
        position: relative;
        & span{
          position: absolute;
          top:10px;
          font-size: 14px;
          color: #20aaf8;
          right:0;
        }
      }
      &:last-child{
        border-bottom: none;
        margin-bottom: 0px;
      }
    }
  }
    @keyframes zoom-in{
      0%{
      opacity:0;
      -webkit-transform:scale3d(.3,.3,.3);
      transform:scale3d(.3,.3,.3)
    }
    50%{
      opacity:1
    }
  }
  textarea::-webkit-input-placeholder {
    color: #93c4f7 !important; 
  }
  *{
      -webkit-touch-callout:none;  /*系统默认菜单被禁用*/
      -webkit-user-select:none; /*webkit浏览器*/
      -khtml-user-select:none; /*早期浏览器*/
      -moz-user-select:none;/*火狐*/
      -ms-user-select:none; /*IE10*/
      user-select:none;
  }
  input {
    -webkit-user-select:auto; /*webkit浏览器*/
  }
  
</style>

