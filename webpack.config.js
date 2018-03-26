var webpack =require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');


//环境变量配置 dev/online
var WEBPACK_ENV =process.env.WEBPACK_ENV ||"dev";

//获取html-webpack-plugins的html参数的方法
var getHtmlConfig=function(name,title){
	return{
	template:"./src/view/"+name+".html",
			filename:"view/"+name+".html",
			inject:true,
			title :title,
			hash:true,
			chunks:["common",name]
	}
}

//webpack config 配置
var config = {
   entry:{
   	"common":["./src/page/common/index.js"],
   	"index":["./src/page/index/index.js"],
   	"login":["./src/page/login/index.js"],
   	"result":["./src/page/result/index.js"]
   },
   output:{
   	path:__dirname + '/dist/',
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
		      },
		      {
                test: /\.string$/, 
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
              }
          
		]
	},
	resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
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
		new HtmlWebpackPlugin(getHtmlConfig("index","首页")),
		new HtmlWebpackPlugin(getHtmlConfig("login","登录页")),
		new HtmlWebpackPlugin(getHtmlConfig("result","操作结果"))
   ]
};
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8098/');
}

module.exports=config




