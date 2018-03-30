//引入工具类
var _mm=require("util/mm.js")

var _payment={
	//获取支付信息
	getPaymentInfo:function(orderNo, resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/order/pay.do'),
			data:{
				orderNo:orderNo
			},
			type:"POST",
			success:resolve,
			error:reject	
		})	
	},
	getPaymentStatus:function(orderNo, resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/order/query_order_pay_status.do'),
			data:{
				orderNo:orderNo
			},
			type:"POST",
			success:resolve,
			error:reject	
		})	
	}
}

module.exports=_payment;