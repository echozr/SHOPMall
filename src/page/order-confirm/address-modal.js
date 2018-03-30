var _mm = require('util/mm.js');
var _cities = require('util/citys.js');
var _address = require('service/address-service.js');
var templateAddressModal = require('./address-modal.string');

//定义一个弹框对象
var addressModal={
	data:{},
	show:function(option){
		//将传入的 option缓存到data中；
		this.data.option=option;
		this.data.option.data=option.data;
		//因为要多次操作modal-warp,所以封装起来
		this.$modalWrap= $('.modal-wrap');
		//显示弹出框
		this.loadModal();
		this.bindEvent();
	},
	//加载显示模态框
	loadModal:function(){
		console.log(this.data);
		var modalHtml=_mm.renderHtml(templateAddressModal,{
			isUpdate:this.data.option.isUpdate,
			data:this.data.option.data
		})
		this.$modalWrap.html(modalHtml);
		//显示弹框后显示省份；
		this.loadProvinces();	
	},
	bindEvent:function(){
		var _this=this;
		//切换省后加载对应的市
		$('#receiver-province').on('change',function(){
			_this.loadCitys($(this).val());
		})	
		//保存收货地址
		$(".address-btn").on("click",function(){
			//获取是新增还是编辑的参数及提交的信息
			var isUpdate=_this.data.option.isUpdate;
			var receiverInfo=_this.getReceiverInfo();
			// 如果为新增，且验证通过
			if(!isUpdate && receiverInfo.status){
				_address.save(receiverInfo.data,function(res){
					_mm.successTips('地址添加成功');
                    _this.hide(); //当前窗口隐藏
                    typeof _this.data.option.onSuccess === 'function' 
                        && _this.data.option.onSuccess(res);
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
			}
			//如果是编辑切验证通过
			else if(isUpdate && receiverInfo.status){
				_address.updateAddress(receiverInfo.data,function(res){
					_mm.successTips('修改地址成功');
                    _this.hide(); //当前窗口隐藏
                    typeof _this.data.option.onSuccess === 'function' 
                        && _this.data.option.onSuccess(res);
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
			}else{
				_mm.errorTips(receiverInfo.msg || "出错了 请检查代码")
			}	
		})
		// 保证点击modal内容区的时候，不关闭弹窗
        this.$modalWrap.find('.modal-container').click(function(e){
            e.stopPropagation();
        });
		//关闭面板
		$(".close").on("click",function(){
			_this.hide();
		})
	},
	//加载省
	loadProvinces:function(){
		var ProvincesData=_cities.getProvinces();
        $("#receiver-province").html(this.getSelectOption(ProvincesData));	
        if(this.data.option.isUpdate&&this.data.option.data.receiverProvince){
        	$("#receiver-province").val(this.data.option.data.receiverProvince); //赋值给省
        	this.loadCitys(this.data.option.data.receiverProvince);//调用市的数据
        }
	},
	//加载市
	loadCitys:function(provinceName){
		var citysData=_cities.getCities(provinceName);
		$("#receiver-city").html(this.getSelectOption(citysData));
		if(this.data.option.isUpdate&&this.data.option.data.receiverCity){
        	$("#receiver-city").val(this.data.option.data.receiverCity); //赋值给市
        }
	},
	//根据数据循环生成option
	getSelectOption:function(data){
		var html='<option val="">-请选择-</option>';
		for(var i=0;i<data.length;i++){
			html+='<option val="'+data[i]+'">'+data[i]+'</option>';
		}
		return html;
	},
	//获取弹出框信息验证 并 返回获取 到的信息；
	getReceiverInfo:function(){
		//创建返回结果
		var result={
			status:false,
			msg:'',
			data:{}
		}
		//获取输入信息制作成对象
		var receiverInfo={
			"receiverName":$.trim($("#receiver-name").val()),
			"receiverProvince":$.trim($("#receiver-province").val()),
			"receiverCity":$.trim($("#receiver-city").val()),
			"receiverAddress":$.trim($("#receiver-address").val()),
			"receiverMobile":$.trim($("#receiver-phone").val()),
			"receiverZip":$.trim($("#receiver-zip").val())
		}
		if(this.data.option.isUpdate){
			receiverInfo.id=$.trim($("#receiver-id").val())
		}
		// 表单验证
		if(!receiverInfo.receiverName){
			result.msg="请输入收件人姓名"
		} else if(!receiverInfo.receiverProvince){
			result.msg="请选择收件人所在省份"
		} else if(!receiverInfo.receiverCity){
			result.msg="请选择收件人所在城市"
		} else if(!receiverInfo.receiverAddress){
			result.msg="请输入收件人详细地址"
		} else if(!receiverInfo.receiverMobile){
			result.msg="请输入收件人手机号"
		}else{
		// 所有验证都通过了
			result.status=true;
			result.data=receiverInfo;
		}
		return result;
	},
	 // 关闭弹窗
    hide : function(){
        this.$modalWrap.empty();
    }	
}

module.exports=addressModal;