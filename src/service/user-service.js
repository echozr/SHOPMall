//引入工具类
var _mm=require("util/mm.js")
var _user={
	//检查登录信息
	checkLogin:function(resolve, reject){
		_mm.requese({
			url:_mm.getServerUrl('/user/get_user_info.do'),
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
