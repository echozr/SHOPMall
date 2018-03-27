require('./index.css')
require('page/common/nav-simple/index.js');
var _mm = require("util/mm.js")
var _user=require("service/user-service.js")

var formError ={
	show: function(errMsg) {
		$(".error-item").show().find(".err-msg").text(errMsg)
	},
	hide: function() {
		$(".error-item").hide().find(".err-msg").text("")
	}
}
var page = {
	init: function() {
		this.bindEvent()
	},
	bindEvent: function() {
		var _this = this
		//点击登录按钮触发提交事件
		$("#submit").on("click", function() {
			_this.submit();
		})
		//在密码框输入回车触发提交事件
		$('.user-content').keyup(function(e) {
			if(e.keyCode == "13") {
				_this.submit()
			}
		})

	},
	//提交表单
	submit: function() {
		var formData = {
			username: $.trim($("#username").val()),
			password: $.trim($("#password").val())
		}
		// 表单验证结果
		validateResult = this.formValidate(formData);
		//验证成功 调用登录方法
		if(validateResult.status) {
			_user.login(formData,function(res){
				window.location.href=_mm.getUrlParam("redirect") || './index.html'
			},function(errMsg){
				//登录失败
				formError.show(errMsg)
			})

		} else {
			//验证失败错误提示
			formError.show(validateResult.msg)
		}

	},
	formValidate: function(formData) {
		var result = {
			status: false,
			msg: ""
		}
		if(!_mm.validate(formData.username, "require")) {
			result.msg = "用户名不能为空"
			return result
		}
		if(!_mm.validate(formData.password, "require")) {
			result.msg = "密码不能为空"
			return result
		}
		//通过验证；
		result.status = true;
		result.msg = "验证通过";
		return result;
	}

}

$(function() {
	page.init();
})