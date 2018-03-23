var webpack =require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');


//环境变量配置 dev/online
var WEBPACK_ENV =process.env.WEBPACK_ENV ||"dev";

//获取html-webpack-plugins的html参数的方法
var getHtmlConfig=function(name){
	return{
	template:"./src/view/"+name+".html",
			filename:"view/"+name+".html",
			inject:true,
			hash:true,
			chunks:["common",name]
	}
}

//webpack config 配置
var config = {
   entry:{
   	"common":["./src/page/common/index.js"],
   	"index":["./src/page/index/index.js"],
   	"login":["./src/page/login/login.js"]
   },
   output:{
   	path:"./dist",
   	filename:"js/[name].js",
   	publicPath:"/dist/"
   },
   externals:{
   	"jquery":"window.jQuery"
   },
   module: {
		loaders: [
		      { test: /\.css$/, 
		      	loader: ExtractTextPlugin.extract("style-loader","css-loader") 
		      },
		      { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
		       	loader: 'url-loader?limit=8192&name=resource/[name].[ext]'
		      }
          
		]
	},
   plugins:[
        //独立公用模块到js/commom.js
		new webpack.optimize.CommonsChunkPlugin({
		     name: "common", 
		     filename: "js/commons.js"
		}),
		//将css单独打包到文件
		new ExtractTextPlugin("css/[name].css"),
		//html模板的处理
		new HtmlWebpackPlugin(getHtmlConfig("index")),
		new HtmlWebpackPlugin(getHtmlConfig("login"))
   ]
};
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8098/');
}

module.exports=config




