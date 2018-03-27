require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide= require('page/common/nav-side/index.js');
var _mm= require('util/mm.js');
var _user= require('service/user-service.js');

var page={
	
	init:function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		// 初始化左侧菜单
		navSide.init({
		 		name:"user-pass-update"
		})	
	},
	bindEvent:function(){
		var _this=this;
		   $(document).on('click', '.btn-submit', function(){
			var userInfo={
				passwordOld:$.trim($("#password").val()),
				passwordNew:$.trim($("#password-new").val()),
				passwordconfirem:$.trim($("#password-confirm").val())
			}
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				//验证成功更改用户信息
				_user.updatePassword(userInfo,function(res){
					_mm.successTips(res);
				},function(errMsg){
					_mm.errorTips(errMsg)
				})
			}else{
				_mm.errorTips(validateResult.msg)
			}	
		})
		
	},
	validateForm: function(formData) {
		var result = {
			status: false,
			msg: ""
		}
		// 旧密码不能为空
		if(!_mm.validate(formData.passwordOld, "require")) {
			result.msg = "旧密码不能为空"
			return result
		}
		 // 验证新密码长度
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '密码长度不得少于6位';
            return result;
        }
		// 新密码与确认密码保持一致
		if(formData.passwordNew!=formData.passwordconfirem) {
			result.msg = "两次输入的密码不一致"
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
