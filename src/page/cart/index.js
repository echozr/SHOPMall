'use strict';
require('./index.css');

require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');
var templateCart = require('./index.string');
var nav = require('page/common/nav/index.js');

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
		//购物车选中某个商品
		$(document).on("click",".cart-select",function(){
			var productID=$(this).parents(".cart-table").attr("data-product-id")
			if($(this).is(":checked") ){
			_cart.selectProduct(productID,function(res){
				_this.randerHtml(res)
			},function(errMsg){
				_this.showCartError()
			})
			//购物车取消选中某个商品	
			}else{
				_cart.unselectProduct(productID,function(res){
				_this.randerHtml(res)
			},function(errMsg){
				_this.showCartError()
			})
			}	
		})
		//购物车全选
		$(document).on("click",".cart-select-all",function(){
			if($(this).is(":checked") ){
			_cart.selectAll(function(res){
				_this.randerHtml(res)
			},function(errMsg){
				_this.showCartError()
			})
			//购物车取消全选	
			}else{
				_cart.unselectAll(function(res){
				_this.randerHtml(res)
			},function(errMsg){
				_this.showCartError()
			})
			}	
		})
		
		//更新购物车某个产品数量
		$(document).on("click",".count-btn", function(){
			//创建变量
			var $this= $(this)
			var currentCount=Number($this.siblings(".count-input").val()); //获取当前数量；
			var type=$this.hasClass("plus")? "plus" : "minus"	 //判断点击的类型;
			var productID=$this.parents(".cart-table").attr("data-product-id")
			var maxCount=Number($this.siblings(".count-input").attr("data-max")); //获取最大库存
			var minCount=1;
			var newCount=0;
			//点击添加
			if(type==="plus"){
				if(currentCount>=maxCount){
					_mm.errorTips("该商品数量已达到上限");
					return	
				}else{
					newCount=currentCount+1
				}	
			}
			//点击减号
			else if(type==="minus"){
				if(currentCount<=minCount){
					return
				}else{
					newCount=currentCount-1
				}
			}
			//根据productID 和newCount更新购物车数量
			_cart.updateProduct({
				productId:productID,
				count:newCount
			},function(res){
				_this.randerHtml(res)
			},function(errMsg){
				_this.showCartError()
			})	
		})
		
		
		//移除购物车某个产品
		$(document).on("click",".cart-delete", function(){
			 if(window.confirm('确认要删除该商品？')){
                var productId = $(this).parents('.cart-table')
                    .data('product-id');
                _this.deleteCartProduct(productId);
           }	
		})
		//点击删除选中
		$(document).on("click",".delete-selected", function(){
			 if(window.confirm('确认要删除该商品？')){
                var productIdARR=[];
                $(".cart-select:checked").each(function(){
                	productIdARR.push($(this).parents(".cart-table") .data('product-id'));	
                })
                
                console.log(productIdARR);
               if(productIdARR.length){
                	_this.deleteCartProduct(productIdARR.join(","));
                }else{
                	_mm.errorTips('您还没有选中要删除的商品');
                }
           }	
		})
		
		//点击去结算
		$(document).on("click",".btn-submit", function(){
			//当购物车有商品 总价大于0  才能 结算
			if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice>0){
				Window.location.href="./order-confirm.html"	
			}else{
				_mm.errorTips("请选择商品后再结算")
			}
			
		})
		
		
	
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
	//删除购物车商品（两个方法要用到  封装成方法 不谢在点击事件中）
	deleteCartProduct:function(productId){
		var _this=this;
		_cart.delateProduct(productId,function(res){
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
		nav.loadCartCount();
	},
	// 显示错误信息
    showCartError: function(){
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
    }
}

$(function() {
	page.init()

})