
import * as types from './mutation-types'
import Vue from "vue";

const mutations = {
  //设置当前美食
  [types.SET_DISH](state, dish) {
    state.dish = dish
  },
  //设置微信用户信息
  [types.SET_USER_INFO](state, user) {
    state.userInfo = user
  },
  //设置loading框状态
  [types.SET_LOADING](state){
    state.loadingFlag = !state.loadingFlag;
  },
  //设置美食ID
  [types.SPEC_LIST_0](state, speclist) {
    state.speclist[0].id = speclist
  },
  //设置美食做法
  [types.SPEC_LIST_1](state, speclist) {
    state.speclist[1].id = speclist
  },
  //设置菜单显示
  [types.SET_MENU](state, value) {
    state.menuFlag = !state.menuFlag;
  },
  //设置遮罩显示
  [types.SET_MASK](state, value) {
    state.maskFlag = !state.maskFlag;
  },
  //设置美食加料
  [types.SPEC_LIST_2](state, speclist) {
    state.speclist[2].id = speclist
  },
  //设置套餐类型
  [types.SPEC_LIST_3](state, speclist) {
    state.speclist[3].id = speclist
  },
  //设置当前美食详情
  [types.SET_DISH_DET](state, dishdet) {
    state.dishdet = dishdet
  },
  //当前所有美食
  [types.SET_DISH_LIST](state, dishlist) {
    state.dishlist = dishlist
  },
  //当前所有美食
  [types.SET_HOT_LIST](state, hotlist) {
    state.hotlist = hotlist
  },
  //设置规格弹窗
  [types.CHANGE_SPEC](state) {
    state.specFlag = !state.specFlag;
  },
  //设置map为空
  [types.SET_NULL](state) {
    state.selecteds = new Map();
    state.selectArray = [];
  },
  //加入购物车
  add: (state, obj) => {
    if(!isSpec(obj)){
      operationCommon('add',state,obj);
    }else{
      operationSpec('add',state,obj);
    }
    filterMap(state);
    //console.log(state.selecteds);
  },
  //移除美食
  remove: (state, obj) => {
    if(!isSpec(obj)){
      operationCommon('remove',state,obj);
    }else{
      operationSpec('remove',state,obj);
    }
    filterMap(state);
    //console.log(state.selecteds)
  },

}

const filterMap = function(state){
  state.selectArray = [];
  state.selecteds.forEach(function(value,key){
    Vue.set(value, "selectId", key);
    state.selectArray.push(value);
  })
}

/**
 * 是否多选类
 * @param {} obj
 */
const isSpec = function(obj){
  return obj.skuType != 'NONE' ||  (obj.cookingMethods && obj.cookingMethods.length) || (obj.snacks && obj.snacks.length);
}

/**
 * 普通菜操作
 * @param {*} type
 * @param {*} state
 * @param {*} id
 */
const operationCommon = function(type,state,obj) {
  state.dishlist.forEach(item => {//普通类别
    item.goodsList.forEach(child => {
      if(child.id === obj.id){
        if(type === 'add'){
          child.count++;
          if(state.selecteds.has(obj.id)){
            state.selecteds.get(obj.id).count = child.count;
            setChild('add',state,obj,obj.id);
          }else{
            obj.count = 1;
            state.selecteds.set(obj.id,obj);
            setChild('set',state,obj,obj.id);
          }
        }else{
          child.count--;
          state.selecteds.get(obj.id).count = child.count;
          setChild('remove',state,obj,obj.id);
          if(child.count < 1){
            child.count = 0;
            state.selecteds.delete(obj.id);
          }
        }
      }
    })
  })
  state.hotlist.forEach(item => {//热销推荐首页累积计数
    if(item.goods.id === obj.id){
      if(type === 'add'){
        item.goods.count = state.selecteds.get(obj.id).count;
      }else{
        if(item.goods.count < 1){
          item.goods.count = 0;
        }else{
          item.goods.count = state.selecteds.get(obj.id).count;
        }
      }
    }
  })
  //console.log(state.selecteds);
}


const setChild = function(type,state,obj,id){
  if(type === 'set'){
    let child = [];
    let data = Object.assign({},obj);
    data.packStatus = false,//是否打包
    data.remark = [];//系统备注
    data.udefined = '';//自定义备注
    child.push(data);
    Vue.set(obj,'child',child);
  }else if(type === 'add'){
    let childObj = state.selecteds.get(id).child;
    childObj.push(Object.assign({},childObj[0]));
    childObj[childObj.length - 1].packStatus = false;
    childObj[childObj.length - 1].remark = [];
    childObj[childObj.length - 1].udefined = '';
  }else if(type === 'remove'){
    let childObj = state.selecteds.get(id).child;
    childObj.splice(childObj.length-1,1);
  }
}


/**
 * 多选菜操作
 * * @param {*} type
 * * @param {*} state
 * * @param {*} obj
 */
const operationSpec = function(type,state,obj){
  let newObj = JSON.parse(JSON.stringify(obj))
  let selectid = '';
  selectid = obj.selectId ? obj.selectId:state.ids;
  if(type === 'add'){
    if(state.selecteds.has(selectid)){
      state.selecteds.get(selectid).count++;
      newObj.count = state.selecteds.get(selectid).count;
      setChild('add',state,obj,selectid);
    }else{
      newObj.count = 1;
      state.selecteds.set(selectid,newObj);
      setChild('set',state,newObj,selectid);
    }
  }else{
    state.selecteds.get(selectid).count--;
    newObj.count = state.selecteds.get(selectid).count;
    setChild('remove',state,obj,selectid);
    if(state.selecteds.get(selectid).count < 1){
      state.selecteds.delete(selectid);
      newObj.count = 0;
    }
  }
  obj.count = newObj.count;
}

export default mutations
