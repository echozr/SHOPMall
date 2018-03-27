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
		this.bindEvent();
	},
	onload:function(){
		// 初始化左侧菜单
		navSide.init({
		 		name:"user-center"
		})	
		 // 加载用户信息
        this.loadUserInfo();
	},
	bindEvent:function(){
		var _this=this;
		   $(document).on('click', '.btn-submit', function(){
			var userInfo={
				email:$.trim($("#email").val()),
				phone:$.trim($("#phone").val()),
				question:$.trim($("#question").val()),
				answer:$.trim($("#answer").val())
			}
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				//验证成功更改用户信息
				_user.updateUserInfo(userInfo,function(res){
					_mm.successTips(res.msg);
                    window.location.href = './user-center.html';
				},function(errMsg){
					_mm.errorTips(errMsg.msg)
				})
			}else{
				_mm.errorTips(validateResult.msg)
			}	
		})
		
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
		
	},
	validateForm: function(formData) {
		var result = {
			status: false,
			msg: ""
		}
		
		 // 验证邮箱格式
		if(!_mm.validate(formData.email, "email")) {
			result.msg = "邮箱格式不正确"
			return result
		}
		   // 验证手机号
		if(!_mm.validate(formData.phone, "phone")) {
			result.msg = "电话格式不正确"
			return result
		}
		// 验证密码提示问题是否为空
		if(!_mm.validate(formData.question, "require")) {
			result.msg = "密码提示问题不能为空"
			return result
		}
		// 验证密码提示问题答案是否为空
		if(!_mm.validate(formData.answer, "require")) {
			result.msg = "密码提示答案不能为空"
			return result
		}
		//通过验证；
		result.status = true;
		result.msg = "验证通过";
		return result;
	}

}
	


$(function(){
    page.init();
});
