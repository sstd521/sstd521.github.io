var exec = require('child_process').exec;
// Hexo 2.x 传进来的参数即是路径
/*
hexo.on('new', function(path){
    exec('"S:\\Hexo\\MarkdownPad2\\MarkdownPad2.exe" ' + "\"" + [path] + "\"");
});
*/
// Hexo 3 传进来的参数是一个{}定义的多属性对象，
//		参见"hexo根目录/node_modules/hexo/lib/plugins/console/new.js"
hexo.on('new', function(data){
    exec('"D:/Program Files/Typora/Typora.exe" ' + "\"" + [data.path] + "\"");
});