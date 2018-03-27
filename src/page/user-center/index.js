require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide= require('page/common/nav-side/index.js');
var _mm= require('util/mm.js');
var _user= require('service/user-service.js');
var templeIndex=require('./index.string');

var page={
	
	init:function(){
		this.onload();
	},
	onload:function(){
		// 初始化左侧菜单
		navSide.init({
		 		name:"user-center"
		})	
		 // 加载用户信息
        this.loadUserInfo();
		
	},
	loadUserInfo:function(){
		 var userHtml = '';
		 _user.getUserInfo(function(res){
		 	//获取信息成功
		 	userHtml=_mm.renderHtml(templeIndex,res);
		 	$(".panel-body").html(userHtml);
		 },function(errMsg){
		 	_mm.errorTips(errMsg);
		 	
		 })
		
	}
	
};

$(function(){
    page.init();
});
