"use strict"

var gulp = require("gulp");
var del = require("del");
//var concat = require("gulp-concat");
var cleanCss = require("gulp-clean-css");
var uglifyjs = require("gulp-uglify");
var rename = require("gulp-rename");
var sass = require("gulp-ruby-sass");
var livereload = require('gulp-livereload');
//var csso = require('gulp-csso');
var connect = require('gulp-connect');
var cgiMock = require('connect-cgi-mock');
//var zip = require('gulp-zip');
//var Client = require('ssh2').Client;
//var sftp = require("gulp-sftp");
var replaceMd5 = require('gulp-replace-md5');
var renameMd5 = require('gulp-rename-md5');
//var cleanhtml = require("gulp-cleanhtml");
var replace = require('gulp-replace');
//var mergeStream = require('merge-stream');
//var cheerio = require('gulp-cheerio');

gulp.task("clean", [], function(cb){
    return del(["dist/**","!dist"], cb);
});

gulp.task('default',function () {
    gulp.start('server');
});

gulp.task("build:config", function() {
    return gulp.src("src/config/**")
        .pipe(gulp.dest("dist/config"));
});

gulp.task("build:Js",[], function(){
    return gulp.src("src/js/*.js")
		//.pipe(uglifyjs())
        .pipe(gulp.dest("dist/js"));
});

gulp.task("build:Images",[], function(){
     return gulp.src("src/images/**")
        .pipe(gulp.dest("dist/images"));
});


gulp.task("build:Libs",[], function(){
    return gulp.src("src/assets/**")
        .pipe(gulp.dest("dist/assets"));
});

gulp.task("build:html",[], function(){
     return gulp.src("src/html/*.html")
        .pipe(replace(/{{{/g, ''))
        .pipe(replace(/}}}/g, ''))
        .pipe(gulp.dest("dist/html"));
});

gulp.task("minify", function(){
    return sass('src/sass/*.scss', { noCache: true })
        .on('error', sass.logError)
        //.pipe(cleanCss({compatibility: true}))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("dist/css"))
        //.pipe(renameMd5())
        .pipe(gulp.dest("dist/css"));
});




gulp.task('server', ['watch'], function () {
    connect.server({
        root: 'dist',
        port: 8081,
        livereload: true,//服务器映射外网可能出问题 上传服务器需要改为 false
        middleware: function(){
            return [
                cgiMock({
                    root: __dirname + '/src/cgiMock',
                    route: '/finance'
                })
            ]
        }
    });
    require('opn')('http://localhost:8081/html/localStorageCache.html');
});

gulp.task('watch', ['build'], function () {
	gulp.watch('src/config/*.*', ['build:config']);
	gulp.watch('src/assets/js/*.js', ['build:Libs']);
	gulp.watch('src/sass/*.scss', ['minify']);
    gulp.watch('src/js/*.js', ['build:Js']);
    gulp.watch('src/html/*.html', ['build:html']);
    gulp.watch('src/images/*.*', ['build:Images']);
    var server = livereload();
    gulp.watch('dist/**/**').on('change', function (file) {
        server.changed(file.path);
    });
});

gulp.task("build", ["build:config","build:Js","build:Libs","build:Images","build:html","minify"]);
