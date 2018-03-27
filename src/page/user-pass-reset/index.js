require('./index.css')
require('page/common/nav-simple/index.js');
var _mm = require("util/mm.js")
var _user = require("service/user-service.js")

var formError = {
	show: function(errMsg) {
		$(".error-item").show().find(".err-msg").text(errMsg)
	},
	hide: function() {
		$(".error-item").hide().find(".err-msg").text("")
	}
}
var page = {
	data: {
		username: '',
		question: '',
		answer: '',
		token: ''
	},
	init: function() {
		this.onload();
		this.bindEvent();
	},
	onload: function() {
		this.loadStepUsername();
	},
	bindEvent: function() {
		var _this=this;
		//输入用户名点击查询
		$("#submit-username").on("click", function() {
			var username = $.trim($("#username").val());
            //判断用户名是否存在
            if(username){
            	_this.data.username=username;
            	_user.getQuestion(username,function(res){
            		_this.data.question=res;
            		_this.loadSterQuestion();	
            	},function(errMsg){
            		formError.show(errMsg);
            	})
            }else{
            	formError.show("请输入用户名")
            }
		})
		//输入问题答案点击查询
		$("#submit-question").on("click",function(){
			var answer=$.trim($("#answer").val())
			//输入的答案判断是否为空
			if(answer){
				_this.data.answer=answer;
				_user.checkAnswer({
					username:_this.data.username,
					question:_this.data.question,
					answer:_this.data.answer
				},function(res){
					_this.data.token=res;
					_this.loadStepPassword()
					
				},function(errMsg){
					formError.show(errMsg);
				})
			}else{
				formError.show("请输提示问题的答案")
			}	
		})
		//输入新密码的点击事件
		$("#submit-password").on("click",function(){
			var passwordNew=$.trim($("#password").val());
			//判断密码不为空
			if(passwordNew && passwordNew.length>=6){
				_user.resetPassword({
					username:_this.data.username,
					passwordNew:passwordNew,
					forgetToken:_this.data.token
				},function(res){
					window.location.href='./result.html?type=pass-reset'
				},
				function(errMsg){	
					formError.show(errMsg)
				})
			}else{
				formError.show("请输入不少于6位的新密码")
			}
			
			
		})

	},
	// 加载输入用户名的一步
	loadStepUsername: function() {
		$('.step-username').show();
	},
	//加载输入密码提示问题答案的一步
	loadSterQuestion:function(){
		var _this=this;
		formError.hide();
		$(".step-username").hide().siblings(".step-question").show().find(".question").text(_this.data.question);
	},
	//加载输入password的一步
	loadStepPassword:function(){
		var _this=this;
		formError.hide();
		$(".step-question").hide().siblings(".step-password").show()
		
		
	}

}

$(function() {
	page.init();
})