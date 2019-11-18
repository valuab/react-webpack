
// 核心概念：
// 入口(entry)
// 输出(output)
// loader
// 插件(plugin)
// 模式(mode)
// 浏览器兼容性(browser compatibility)

// 安装 ：
// 本地安装:
//  cnpm i  --save-dev webpack
// 如果使用webpack4.x  还需要 安装 webpack-cli  
// cnpm i  -- save-dev webpack-cli
// webpack 脚本使用 即 package.json文件

//安装loader
// 例如，你可以使用 loader 告诉 webpack 加载 CSS 文件，或者将 TypeScript 转为 JavaScript。为此，首先安装相对应的 loader：

// npm install --save-dev css-loader
// npm install --save-dev ts-loader
// 然后指示 webpack 对每个 .css 使用 css-loader，以及对所有 .ts 文件使用 ts-loader：

// webpack.config.js

// module.exports = {
//   module: {
//     rules: [
//       { test: /\.css$/, use: 'css-loader' },
//       { test: /\.ts$/, use: 'ts-loader' }
//     ]
//   }
// };

//npm i xxx  --save  和  --save-dev 的区别 --save 即是 —S 生产模式 存入 dependencies 中; --save -dev  即是 -D开发模式 存于package.json devDependencies 中

//plugins 插件包引用  有不同的语法 详见：
//  webpack-html-plugin 下载引入 cnpm i webpack-html-plugin

// const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');//通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

// console.log(resolve)
module.exports = {
    //模式mode 
    mode: 'development', // "production" 生产 | "development" 开发 | "none"

    //入口文件写法
    // entry:'./src/index.js', //单入口写法，即打包的主要js文件//简写
    // entry:{
    //     // main:'./src/index.js'
    //     index:'./src/index.js'  
    // } //单入口写法，即打包的主要js文件//完整的写法//main是生成的文件名  //例如: index:'./src/index.js'
    //多入口文件写法
    entry:{
        main:'./src/test.js',
        index:'./src/index.js' //这样dist文件夹下会生成index.js和main.js两个文件，分别是对应打包路径对应的文件//由于框架可能会使用第三方脚本，需要单独打包
    },


    //出口文件写法
    //单入口起点时//输出一个单一文件名就可以//即将打包的单入口对象打包成filename配置的文件名，path是打包的绝对路径，需要拼接
    //hash一般文件名字相同会导致资源缓存，hash通过MD5产生，广泛应用于文件是否篡改

    // output:{
    //     filename:'build.js',
    //     // path:resolve(__dirname,'./dist/')
    //     path:__dirname + '/dist/'
    // }

    //多入口起点时
    output:{
        // filename:'[name]-[hash:5].js',
        filename:'[name].js',
        path:path.resolve(__dirname,'./dist/')
        // path:__dirname + '/dist'
    },


    //了解loader //webpack本身只支持js,打包其他文件就需要依靠loader,即装载机，loader能让webpack处理非js文件，甚至能将图像处理为dataUrl,h5支持dataUrl //loader执行从后往前//例如：.vue-loader 处理 .vue文件
    //配置css-loader，将css文件转为js
    module:{
        rules : [
            // {test: /\.css$/, use: 'css-loader'},  //这是表示.css结尾的文件，以及使用css-loader
            {
                test:/\.css$/,
                use:[
                    'style-loader' , //同处理css文件，加上style-loader//将css文件添加到dom中,先执行css-loader,从后往前
                    'css-loader'     
                ]
            }
        ]
    },

    //了解插件 //tips: plugins是个数组
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
}