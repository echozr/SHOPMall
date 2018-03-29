'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');
var templateCart = require('./index.string');

var page = {
	data: {
	
	},
	init: function() {
		this.onload();
		this.bindEvent();
	},
	onload: function() {
		this.loadcartList();
	},
	bindEvent: function() {
		var _this=this;
	
	},
	//加载购物侧列表
	loadcartList: function() {
		var _this=this;
		//获取购物车列表 
		_cart.getCartList(function(res){
			_this.randerHtml(res)
		},function(errMsg){
			_this.showCartError()
		})
		
	},
	filter:function(data){
		data.notEmpty = !!data.cartProductVoList.length;
	},
	//渲染购物车页面
	randerHtml:function(data){
		this.filter(data);
		//缓存购物车信息// 
        this.data.cartInfo = data;
		var cartHtml=_mm.renderHtml(templateCart,data);
		$(".page-wrap").html(cartHtml);
	},
	// 显示错误信息
    showCartError: function(){
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
    }
}

$(function() {
	page.init()

})