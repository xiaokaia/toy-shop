/**
 * 支付宝公用方法
 * author by kairry 2017年12月29日
 */

function ready(callback) {
  // 如果jsbridge已经注入则直接调用
  if (window.AlipayJSBridge) {
    callback && callback();
  } else {
    // 如果没有注入则监听注入的事件
    document.addEventListener('AlipayJSBridgeReady', callback, false);
  }
}

/**
 * 支付宝支付
 * @param {*} orderNo
 */
export function aliPay(orderNo){
  ready(function(){
    AlipayJSBridge.call("tradePay", {
      tradeNO: ''+orderNo+''
    }, function(result) {
      if(result.resultCode == '9000'){
        alert("支付成功");
        AlipayJSBridge.call('closeWebview');
      }else if("6001" == result.resultCode){
        alert("支付取消");
      }else{
        alert("支付失败");
      }
    });
  })
}
