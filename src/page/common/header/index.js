//引入头部样式
require('./index.css')
//引入工具模块
var _mm=require('util/mm.js');
// 通用页面头部
var header={
	init:function(){
		this.bindEvent();
	},
	onload:function(){
		var keyword=_mm.getUrlParam("keyword");
		//如果关键字不为空，赋值给输入框;
		if(keyword){
			$("#search-input").val(keyword)
		}
	},
	bindEvent:function(){
		var _this=this;
		//点击按钮  提交搜索
		$("#search-btn").on("click",function(){
			_this.searchSubmit();
		})
		//在输入框按回车建触发提交时间
		$("#search-input").keyup(function(e){
			if(e.keyCode==13){
				_this.searchSubmit();
			}
		})
	},
	searchSubmit:function(){
		var keyword=$.trim($("#search-input").val());
		// 如果提交的时候有keyword,正常跳转到list页
		if(keyword){
			window.location.href='./list.html?keyword='+keyword;
		}else{
			//如果没有值的话  直接返回首页
			_mm.goHome();
		}	
	}
}

header.init();
