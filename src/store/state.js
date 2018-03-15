
const state = {
  dish:{},
  dishdet:{},
  userInfo:{},
  dishlist:[],
  hotlist:[],
  menuFlag:false,
  maskFlag:false,
  loadingFlag:false,
  ids:'',
  speclist:[
    {
      id: 0 //商品ID
    },
    {
      id: 0 //做法
    },
    {
      id: 0 //规格
    },
    {
      id: 0 //加料
    }
  ],
  specFlag:false,//规格弹窗
  selecteds:new Map,
  selectArray:[]
}

export default state
