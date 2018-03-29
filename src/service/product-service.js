//引入工具类
var _mm=require("util/mm.js")

var _product={
	//获取商品列表
	getProductList:function(data, resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/product/list.do'),
			data:data,
			type:"POST",
			success:resolve,
			error:reject	
		})	
	},
	//获取商品详情
	getProductDetail:function(productId,resolve,reject){
		_mm.requese({
			url:_mm.getServerUrl('/product/detail.do'),
			data:{
				productId:productId
			},
			success:resolve,
			error:reject	
		})	
		
		
	}
}

module.exports=_product;