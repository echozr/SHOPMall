require("./index.css");

//引入工具模块
var _mm=require('util/mm.js');
//引入用户服务类
var _user   = require('service/user-service.js');
var _cart   = require('service/cart-service.js');
//通用页面导航
var nav={
	init:function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this
	},
	bindEvent:function(){
		//点击登陆按钮
		$(".js-login").on("click",function(){
			_mm.doLogin();
		})
		//点击注册按钮
		$(".js-register").on("click",function(){
			window.location.href="./user-register.html"	
		})
		//点击退出按钮
		$(".js-logout").on("click",function(){
			_user.logout(function(res){
				//退出成功刷新页面
				 window.location.reload();
			},function(errMsg){
				_mm.errorTips(errMsg)
			})
		})	
	},
	//加载用户信息 
	loadUserInfo:function(){
		_user.checkLogin(function(res){
			$(".not-login").hide().siblings(".login").show().find(".username").text(res.username);
		},function(errMsg){
			//什么都不做
		})
	},
	//加载购物车数量
	loadCartCount:function(){
       _cart.getCartCount(function(res){
       	$(".cart-count").text(res || 0);
       },function(errMsg){
       		$(".cart-count").text(0);
       })
	}
	
}

module.exports=nav.init();