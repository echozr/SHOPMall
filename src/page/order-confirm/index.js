'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

//引入工具类
var _mm = require("util/mm.js");
var _address = require("service/address-service.js");
var _order = require("service/order-service.js");
var _adModal = require("./address-modal.js");

//引入模板
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
var page = {
	data: {
		selectAddressID: "" //初始一个选择地址的ID  提交的时候需要赋值；
	},
	init: function() {
		this.onload();
		this.bindEvent();
	},
	onload: function() {
		this.loadAddressList();
		this.loadProductList();

	},
	bindEvent: function() {
		var _this = this;
		//选择地址
		$(document).on("click", ".address-item", function() {
			$(this).addClass("active").siblings(".address-item").removeClass("active");
			_this.data.selectAddressID = $(this).data("id");
		})
		//点击新增 地址
		$(document).on("click", ".address-add", function() {
			_adModal.show({
				isUpdate: false, //判断是新增 还是编辑
				onSuccess: function() {
					//添加成功回调方法更新地址列表
					_this.loadAddressList();
				}
			})
		})
		//点击编辑
		$(document).on("click", ".address-update", function(e) {
			e.stopPropagation();
			var shippingId1 = $(this).parents(".address-item").data("id");
			_address.getAddress(shippingId1, function(res) {
				_adModal.show({
					isUpdate: true, //判断是新增 还是编辑
					data: res,
					onSuccess: function() {
						//添加成功回调方法更新地址列表
						_this.loadAddressList();
					}
				})

			}, function(errMsg) {
				_mm.errorTips(errMsg);
			})
		})
		//点击删除
		$(document).on("click", ".address-delete", function(e) {
			e.stopPropagation();
			if(window.confirm("确定要删除该地址？")) {
				_address.deleatAddress($(this).parents(".address-item").data("id"), 
				function(res) {
 				_this.loadAddressList();
				},function(errMsg){
				 _mm.errorTips(errMsg);
				})
			}
		})
		//提交订单
		$(document).on("click", ".order-submit", function() {
			var shippingId = _this.data.selectAddressID;
			//判断是否有shippingID
			if(shippingId) {
				_order.creatOrder(shippingId, function(res) {
					//跳转到支付页面
					window.location.href = './payment.html?orderNumber=' + res.orderNo;

				}, function(errMsg) {
					_mm.errorTips(errMsg);
				})
			} else {
				_mm.errorTips('请选择地址后再提交');
			}
		})

	},
	//加载地址列表
	loadAddressList: function() {
		var _this = this;
		var $addressCon = $(".address-con")
		$addressCon.html('<div class="loading"></div>');
		
		//获取地址数据
		_address.getAddressList(function(res) {
			var addressHtml = _mm.renderHtml(templateAddress, res);
			$addressCon.html(addressHtml);
			console.log(_this.data.selectAddressID)
			$(".address-item").each(function(){
			if($(this).data("id")==_this.data.selectAddressID){
				$(this).addClass("active")
			}
		})	
		}, function(errMsg) {
			$addressCon.html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
		})

	},
	//加载商品列表
	loadProductList: function() {
		var _this = this;
		var $productCon = $(".product-con")
		$productCon.html('<div class="loading"></div>');
		//获商品址数据
		_order.getProductList(function(res) {
			var productHtml = _mm.renderHtml(templateProduct, res);
			$productCon.html(productHtml);
		}, function(errMsg) {
			$productCon.html('<p class="err-tip">商品加载失败，请刷新后重试</p>');
		})

	}

}

$(function() {
	page.init()

})