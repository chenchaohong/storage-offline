开发前准备：右键本目录，点击Git Bash,键入命令 npm install ，不报错的情况下环境ok，报错的话以上命令重新执行
			

开发过程中：使用 gulp 命令，自动打开浏览器，实现代码同步显示。


appcache.js为 application cache demo


localSet 插件功能：使用localStorage缓存js和css文件，减少http请求和页面渲染时间，适用于Web移动端H5页面制作。 
 * 使用方法：   
 *   1.使用此插件前，需要给插件的pageVersion变量赋值，修改版本值即可。 
 *   2.加载Js：由于js加载有顺序要求，所以需要将后加载的脚本作为前一个脚本的回调参数传入