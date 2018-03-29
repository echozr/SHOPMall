'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateDetail = require('./index.string');

var page = {
	data: {
		productId:_mm.getUrlParam("productId")||""
	},
	init: function() {
		this.onload();
		this.bindEvent();
	},
	onload: function() {
		this.loadDeatil();
	},
	bindEvent: function() {
		var _this=this;
		//因为页面是渲染出来的 所以要通过代理添加事件；
		//移入小图
	    $(document).on("mouseenter",".p-img-item",function(){
	    	var imgSrc=$(this).find(".p-img").attr("src");
	    	$(".main-img").attr("src",imgSrc);	
	    })
	    //点击count操作
	    $(document).on("click",".p-count-btn",function(){
	    	var type=$(this).hasClass("plus")?"plus":"minus",
	    	    $pCount= $('.p-count'),
	    	    maxCount=_this.data.detailInfo.stock||1,
	    	    minCount=1,
	    	    currentCount=Number($pCount.val());
	    	    if(type=="plus"){
	    	    	$pCount.val(currentCount<maxCount?currentCount+1:maxCount)
	    	    }else if(type=="minus"){
	    	    	$pCount.val(currentCount>minCount?currentCount-1:minCount)
	    	    }	
	    })
	    //点击加入购物车
	     $(document).on("click",".cart-add",function(){
	     	_cart.addToCar({
	     		productId:_this.data.productId,
	     		count:$(".p-count").val()
	     	},function(res){
	     		window.location.href="./result.html?type=cart-add"
	     		
	     	},function(errMsg){
	     		_mm.errorTips(errMsg)
	     	})
	     	
	     }) 
	},
	//加载产品详情
	loadDeatil: function() {
		var _this=this,
		DetailHtml="",
		$pageWrap=$(".page-wrap");
		// loading
        $pageWrap.html('<div class="loading"></div>');
		_product.getProductDetail(_this.data.productId,function(res){
			//处理图片数据 
			_this.filter(res);
			//将返回结果加入到data（页面创建的data中）
			_this.data.detailInfo=res;
			//渲染html
			DetailHtml=_mm.renderHtml(templateDetail,_this.data.detailInfo)
			$pageWrap.html(DetailHtml);
			
		},function(errMsg){
			$pageWrap.html('<p class="err-tip">找不到对应商品</p>');
		})
	},
	filter:function(data){
		data.subImages=data.subImages.split(",")
	}
}

$(function() {
	page.init()

})