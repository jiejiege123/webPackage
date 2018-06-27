/*
* @Author: ZZZ
* @Date:   2018-05-10 14:55:04
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-05-24 16:27:29
*/
/* jshint esversion: 6 */ 
const gulp = require("gulp");
const del = require("del");  //删除
const bs = require("browser-sync");  //同步刷新
const concat = require("gulp-concat");  //合并文件
const cheerio = require("gulp-cheerio");//修改文件
const uglify = require("gulp-uglify"); // 压缩JS文件
const babel = require("gulp-babel");  //把ES6 转换成ES5的语法
const rename = require("gulp-rename"); //修改文件名称
const autoprefixer = require("gulp-autoprefixer");//自动给CSS3新属性加前缀
const ejs = require('gulp-ejs');

gulp.task('brSync', function() {
    let files = [
    	'public/css/*.css',
    	'public/JavaScript/*.js',
    	'public/*.html',
    	'public/page/*html'
    ];
    bs.init(files,{
    	server:{
    		baseDir:'./public/',//服务器根目录
            //index:'test.html',//设置文件
    	},
        //proxy:'localhost',//地址
        //port:8888,//端口号
    });
});