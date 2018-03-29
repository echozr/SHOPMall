//引入工具类
var _mm=require("util/mm.js")

var _cart={
	//获取购物车数量
	getCartCount:function(resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/cart/get_cart_product_count.do'),
			success:resolve,
			error:reject	
		})	
	},
	//添加商品到购物侧
	addToCar:function(productInfo,resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/cart/add.do'),
			data:productInfo,
			success:resolve,
			error:reject	
		})	
	},
	//获取购物车内的列表数据
	getCartList:function(resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/cart/list.do'),
			success:resolve,
			error:reject	
		})	
	}
}

module.exports=_cart;