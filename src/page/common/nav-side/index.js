//引入头部样式
require('./index.css')
//引入工具模块
var _mm=require('util/mm.js');
var templateIndex =require('./index.string');
// 侧边导航
var navSide={
	 option : {
        name : '',
        navList : [
            {name : 'user-center', desc : '个人中心', href: './user-center.html'},
            {name : 'order-list', desc : '我的订单', href: './order-list.html'},
            {name : 'user-pass-update', desc : '修改密码', href: './user-pass-update.html'},
            {name : 'about', desc : '关于MMall', href: './about.html'}
        ]
    },
	init:function(option){
		// 合并选项
		$.extend(this.option,option)
		this.renderNav()
	},
	//渲染左侧菜单
	renderNav:function(){
		// 计算active数据
		for(var i=0;i<this.option.navList.length;i++){
			if(this.option.navList[i].name===this.option.name){
				this.option.navList[i].isActive=true;
			}	
		}
		// 渲染list数据
        var navHtml = _mm.renderHtml(templateIndex, {
            navList : this.option.navList
        });
        //console.log(navHtml);
        // 把html放入容器
        $('.nav-side').html(navHtml);
		
	}
}

module.exports=navSide;
