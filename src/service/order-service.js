//引入工具类
var _mm=require("util/mm.js")

var _order={
	//获取商品列表
	getProductList:function( resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/order/get_order_cart_product.do'),
			type:"POST",
			success:resolve,
			error:reject	
		})	
	},
	//创建提交订单
	creatOrder:function(shippingId,resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/order/create.do'),
			data:{
				shippingId:shippingId
			},
			type:"POST",
			success:resolve,
			error:reject	
		})	
	},
	//获取订单列表
	getOrderList:function(listParam,resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/order/list.do'),
			data:listParam,
			type:"POST",
			success:resolve,
			error:reject	
		})
	},
	//获取订单详情
	getOrderDetail:function(orderNo,resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/order/detail.do'),
			data:{
				orderNo:orderNo
			},
			type:"POST",
			success:resolve,
			error:reject	
		})
	},
	//取消订单
	cancelOrder:function(orderNo,resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/order/cancel.do'),
			data:{
				orderNo:orderNo
			},
			type:"POST",
			success:resolve,
			error:reject	
		})
	}
}

module.exports=_order;