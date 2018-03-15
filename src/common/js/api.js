/**
 * 接口地址通用类
 * author by kairry 2017年11月20日
 */

import baseUrl from 'config/env'

const apiName = {

  //授权
  alipayOauth: ''+baseUrl.thirdUrl+'/alipay/open/oauth2/1', //支付宝授权 1:静默授权 2:用户手动同意授权
  wechatOauth: ''+baseUrl.thirdUrl+'/wechat/public/oauth2/1', //微信授权 1:静默授权 2:用户手动同意授权

  //美食
  advertingList: ''+baseUrl.apiUrl+'/marketing/adverting/list', //获取促销美食列表
  listBargainGoods: ''+baseUrl.apiUrl+'/merchandise/h5goods/listBargainGoods', //获取砍价商品
  listGoodsByPackageType: ''+baseUrl.apiUrl+'/merchandise/h5goods/listGoodsByPackageType', //获取套餐列表 *根据状态值
  getGoodsById: ''+baseUrl.apiUrl+'/merchandise/h5goods/getGoodsById', //店铺美食详情
  listAllCategoriesAndGoods: ''+baseUrl.apiUrl+'/merchandise/h5goods/listAllCategoriesAndGoods', //店铺所有美食

  //订单
  getStatusByOrderNo: ''+baseUrl.apiUrl+'/order/getStatusByOrderNo', //获取订单状态
  calculatePrice: ''+baseUrl.apiUrl+'/order/calculatePrice', //订单计价
  addOrder: ''+baseUrl.apiUrl+'/order/addOrder', //下单
  appendOrder: ''+baseUrl.apiUrl+'/order/appendOrder', //追加订单
  listOrderInfo: ''+baseUrl.apiUrl+'/order/listOrderInfo', //桌子订单列表
  getOrderInfoByOrderNo: ''+baseUrl.apiUrl+'/order/getOrderInfoByOrderNo', //订单详情
  getOrderByDeskId: ''+baseUrl.apiUrl+'/order/h5/getOrderByDeskId', //获取订单Id
  payOrder: ''+baseUrl.apiUrl+'/order/pay/payOrder', //h5下单获取支付参数
  quickPay: ''+baseUrl.apiUrl+'/order/pay/quickPay', //快捷支付(商户收款)
  cancelOrder: ''+baseUrl.apiUrl+'/order/cancelOrder', //取消订单

  //店铺
  findAreaDeskById: ''+baseUrl.apiUrl+'/shop/desk/findAreaDeskById', //根据桌台id获取详情
  listShopCallServiceWords: ''+baseUrl.apiUrl+'/shop/call/service/words/listShopCallServiceWords', //获取店铺呼叫服务员指令
  changeCallService: ''+baseUrl.apiUrl+'/shop/desk/changeCallService', //呼叫服务
  listShopSettings: ''+baseUrl.apiUrl+'/shop/setting/listShopSettings', //获取店铺配置
  listShopMerchandiseFlavor: ''+baseUrl.apiUrl+'/shop/merchandise/flavor/listShopMerchandiseFlavor', //获取店铺口味偏好
  getShopSettingByBizType: ''+baseUrl.apiUrl+'/shop/setting/getShopSettingByBizType/SHOP', //获取店铺下所属业务设置
  discount: ''+baseUrl.apiUrl+'/marketing/discount/list', //获取店铺活动列表
  advertingList: ''+baseUrl.apiUrl+'/marketing/adverting/list', //获取店铺营销列表
  getShopSetting: ''+baseUrl.apiUrl+'/shop/setting/getShopSetting/1026',
  getShopNotice: ''+baseUrl.apiUrl+'/shop/notice/getShopNotice', //获取店铺公告
  findMerchantMember: ''+baseUrl.apiUrl+'/member/findMerchantMember', //验证会员
  getShopDet: ''+baseUrl.apiUrl+'/merchants/shops', //商户详情
  getMerchantMemberDiscountSetting: ''+baseUrl.apiUrl+'/member/setting/getMerchantMemberDiscountSetting', //获取商户会员优惠方式

  //砍价
  jsConfig: ''+baseUrl.thirdUrl+'/wechat/public/get/jsConfig', //获取config
  startPage: ''+baseUrl.apiUrl+'/marketing/cutPrice/startPage', //砍价初始化页面信息
  helpCutPage: ''+baseUrl.apiUrl+'/marketing/cutPrice/helpCutPage', //好友砍价页面
  helpCut: ''+baseUrl.apiUrl+'/marketing/cutPrice/helpCut', //砍一刀

  //排队取号
  getShopInfo4H5: ''+baseUrl.apiUrl+'/merchants/shops/getShopInfo4H5', //店铺信息
  insertScheduleQueue4H5: ''+baseUrl.apiUrl+'/schedule/queue/insertScheduleQueue4H5', //取号
  findByScheduleQueueId4H5: ''+baseUrl.apiUrl+'/schedule/queue/findByScheduleQueueId4H5', //排队详情
  updateScheduleQueue4H5: ''+baseUrl.apiUrl+'/schedule/queue/updateScheduleQueue4H5', //取消排队

  //卡券
  getCardList:''+baseUrl.apiUrl+'/marketing/coupon/listUserCouponOnPay',//付款是展示商家代金券
  getCardDesc:''+baseUrl.apiUrl+'/marketing/coupon/detail',//券详情
  takeCard:''+baseUrl.apiUrl+'/marketing/coupon/takeCouponOnBargain',//砍价时领取代金券
  savePhone:''+baseUrl.apiUrl+'/marketing/coupon/recordMobile',//保存手机号

  //会员
  memberRecord:''+baseUrl.apiUrl+'/member/account/v2/queryMemberConsumeFlowRecords',//会员消费列表
  userInfo:''+baseUrl.apiUrl+'/user/client/userInfo',//微信用户信息
}

export default apiName
