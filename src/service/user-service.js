//引入工具类
var _mm=require("util/mm.js")
var _user={
	//登录方法
	login:function(data,resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/user/login.do'),
			data:data,
			type:"POST",
			success:resolve,
			error:reject	
		})	
	},
	//用户注册
	register:function(data,resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/user/register.do'),
			data:data,
			type:"POST",
			success:resolve,
			error:reject	
		})	
	},
	//验证用户名是否存在
	checkUsername:function(username,resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/user/check_valid.do'),
			data:{
				str:username,
				type:'username'
			},
			type:"POST",
			success:resolve,
			error:reject	
		})		
	},
	// 检查密码提示问题答案
	checkAnswer:function(userinfo,resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/user/forget_check_answer.do'),
			data:userinfo,
			type:"POST",
			success:resolve,
			error:reject	
		})	
	},
	//重新设置用户密码
	resetPassword:function(userinfo,resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/user/forget_reset_password.do'),
			data:userinfo,
			type:"POST",
			success:resolve,
			error:reject	
		})		
	},
	//更改密码
	updatePassword:function(passinfo,resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/user/reset_password.do'),
			data:passinfo,
			type:"POST",
			success:resolve,
			error:reject	
		})		
	},
	//根据用户名获取问题
	getQuestion:function(username,resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/user/forget_get_question.do'),
			data:{
				username:username
			},
			type:"POST",
			success:resolve,
			error:reject	
		})	
		
	},
	//更新用户信息
	updateUserInfo:function(userinfo,resolve, reject){
		
			_mm.requese({
			url:_mm.getServerUrl('/user/update_information.do'),
			data:userinfo,
			type:"POST",
			success:resolve,
			error:reject	
		})	
		
	},
	
	//检查登录信息
	checkLogin:function(resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/user/get_user_info.do'),
			type:"POST",
			success:resolve,
			error:reject	
		})	
	},
	//获取用户基本信息
	getUserInfo:function(resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/user/get_information.do'),
			type:"POST",
			success:resolve,
			error:reject	
		})	
	},
	//用户登出
	logout:function(resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/user/logout.do'),
			type:"POST",
			success:resolve,
			error:reject	
		})	
	}
}

module.exports=_user;
