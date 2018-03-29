'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');
var pagination =require('util/pagination/index.js')

var page = {
	data: {
		listParam: {
			categoryId:_mm.getUrlParam("categoryId")||"" ,
			keyword: _mm.getUrlParam("keyword")||"",
			pageNum: _mm.getUrlParam("pageNum")||1,
			pageSize: _mm.getUrlParam("pageSize")||10,
			orderBy: _mm.getUrlParam("pageSize")||"default"
		}
	},
	init: function() {
		this.onload();
		this.bindEvent();
	},
	onload: function() {
		this.loadList();
	},
	bindEvent: function() {
		var _this=this;

		$(".sort-item").on("click",function(){
			var $this=$(this);
			//当点击排序按钮时默认调回第一页
			_this.data.listParam.pageNum = 1;
			$this.addClass("active").siblings(".sort-item").removeClass("active desc asc")
			//默认排序
			if($this.attr("data-type")=="default"){
				_this.data.listParam.orderBy="default";
			}
			//价格排序
			else if($this.attr("data-type")=="price"){
			
				if(!$this.hasClass("asc")){
					$this.addClass("asc").removeClass("desc");
					_this.data.listParam.orderBy="price_asc"
				}else{
					$this.addClass("desc").removeClass("asc");
					_this.data.listParam.orderBy="price_desc"
				}
			}
			_this.loadList();
		})

	},
	//加载产品列表
	loadList: function() {
		var _this=this;
		//获取参数
		var listParam=_this.data.listParam;
		
		// 删除参数中不必要的字段（keywo&categortId二选一）
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
		//调用加载列表方法
		_product.getProductList(listParam,function(res){
			//创建模板
			var listHtml= _mm.renderHtml(templateIndex,{list:res.list})
			$(".p-list-con").html(listHtml);
			_this.loadPagination({
				hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
			})
			
		},function(errMsg){
			_mm.errorTips(errMsg);
		})
	},
	//加载分页信息
	loadPagination:function(pageInfo){
		var _this=this;
		_this.pagination? "" :(_this.pagination=new pagination())
		//pagination喧嚷模板：合并{}和pageInfo数据将 模板和时间传入
		_this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
		
		
		
	}

}

$(function() {
	page.init()

})