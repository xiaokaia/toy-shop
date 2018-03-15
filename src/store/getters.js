import Vue from "vue";

const getters = {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done);
  },
  loadingFlag: state => state.loadingFlag,
  userinfo: state => {
    if(JSON.stringify(state.userInfo) === '{}'){//state无值
      if(sessionStorage.getItem('userInfo')){//存在session
        return JSON.parse(sessionStorage.getItem('userInfo'));
      }
    }else{
      return state.userInfo;
    }
  },
  ids: function(state){
    state.ids = '';
    state.speclist.forEach(item => {
      state.ids += item.id + "_";
    })
    state.ids = state.ids.substr(0, state.ids.length - 1);
    return state.ids;
  },
  speclist: state => state.speclist,
  selecteds: state => state.selecteds,
  specFlag: state => state.specFlag,
  dish: state => state.dish,
  dishdet: function(state){
    if(state.dishdet.cookingMethods && state.dishdet.cookingMethods.length){
      state.dishdet.cookingMethods.forEach((item,index) => {
        if(index !== 0){
          item.active = false;
        }
      })
    }
    return state.dishdet;
  },
  dishlist: function(state){
    state.dishlist.forEach(item => {
      item.goodsList.forEach(child => {
        if(state.selecteds.has(child.id)){
          Vue.set(child,'count',state.selecteds.get(child.id).count);
        }else{
          Vue.set(child,'count',0);
        }
      })
    });
    return state.dishlist;
  },
  hotlist: function(state){
    state.hotlist.forEach(item => {
      if(state.selecteds.has(item.goods.id)){
        Vue.set(item.goods,'count',state.selecteds.get(item.goods.id).count);
      }else{
        Vue.set(item.goods,'count',0);
      }
    })
    return state.hotlist;
  }

}


export default getters
