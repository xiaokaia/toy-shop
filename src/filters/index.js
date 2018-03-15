/**
 * 过滤器-工具类
 * author by kairry 2017年11月20日
 */

 /**
  * 转时间戳未时分秒
  */
export function filterTime(nS){
  let getString = function (m) {
    return m < 10 ? '0' + m:m
  }
  let time = new Date(nS),
      y = time.getFullYear(),
      m = time.getMonth()+1,
      d = time.getDate(),
      h = time.getHours(),
      mm = time.getMinutes(),
      s = time.getSeconds();
  return y+'-'+getString(m)+'-'+getString(d)+' '+getString(h)+':'+getString(mm)+':'+getString(s);
}

/**
 * 获取辣度
 * @param {*辣度等级} type
 */
export function getHotLever(type){
  let num = 0;
  if(type === 'AWFUL'){
    num = 3;
  }else if(type === 'MEDIUM'){
    num = 2;
  }else if(type === 'SLIGHT'){
    num = 1;
  }
  return num;
}

/**
 * 支付状态
 * @param {*} status
 */
export function getPayStatus(status){
  switch(status){
    case 'UN_PAY':
      return '未支付';
      break;
    case 'PAYING':
      return '支付进行中';
      break;
    case 'PAY_SUCCESS':
      return '支付成功';
      break;
    case 'PAY_FAIL':
      return '支付失败';
      break;
    default:
      return '未知状态'
  }
}

/**
 * 营销活动
 * @param {*} type
 */
export function getDisscountType(type){
  switch(type){
    case 'FULL_DIS':
      return '整单折扣优惠';
      break;
    case 'FULL_CUT':
      return '整单满减优惠';
      break;
    case 'SINGLE_DIS':
      return '单品折扣优惠';
      break;
    case 'CATEGORY_DIS':
      return '分类折扣优惠';
      break;
    case 'SINGLE_BARGAIN':
      return '单品砍价优惠';
      break;
    case 'FULL_BARGAIN':
      return '整单砍价优惠';
      break;
    case 'MEMBER_PRICE':
      return '会员价优惠';
      break;
    case 'MEMBER_LEVEL':
      return '会员等级优惠'
      break;
    case 'CASH_COUPON ':
      return '代金券优惠'
      break;
    default:
      return '未知优惠'
  }
}


/**
 * 订单状态
 * @param {*} status
 */
export function getOrderStatus(status){
  switch(status){
    case 'WAIT_REC':
      return '待接单';
      break;
    case 'WAIT_PAY':
      return '待结账';
      break;
    case 'FINISHED':
      return '已完成';
      break;
    case 'REFUND':
      return '已退款';
      break;
    case 'CANCEL':
      return '已取消';
      break;
    default:
      return '未知状态'
  }
}
