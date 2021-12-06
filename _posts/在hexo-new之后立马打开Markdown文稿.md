---
title: 在hexo-new之后立马打开Markdown文稿
tags:
  - MarkDown
  - Hexo
date: 2016-10-05 13:36:51
categories: 博客
description: 在hexo-new之后立马打开Markdown文稿，好处就不啰嗦了，直接操作吧。
---



## 在hexo new之后立即用马克飞象打开Markdown文稿
## 第一步 

　　　在根目录新建一个文件夹scripts(因为本来没有，只能新建)，然后新建txt文本文件，重命名为 “open_editor_after_hexo_new_immediately.js”，这个在Windows下干活的人都知道吧，名字可以随便，不过我觉得这个名字比较好认，你以后可能要改也方便。
![Alt text](/images/js.png)

## 第二步: 
　　　随便用一个文本编辑器打开，比如用Sublime Text。读者可以选择自己偏好的markdown编辑器(马克飞象不能用，因为无法保存)，我个人修改内容如下:
　　　
``` javascript
var exec = require('child_process').exec;
// Hexo 2.x 传进来的参数即是路径
/*
hexo.on('new', function(path){
    exec('"S:\\Hexo\\MarkdownPad2\\MarkdownPad2.exe" ' + "\"" + [path] + "\"");
});
*/
// Hexo 3 传进来的参数是一个{}定义的多属性对象，
// 参见"hexo根目录/node_modules/hexo/lib/plugins/console/new.js"
hexo.on('new', function(data){
    exec('"D:/Program Files/Typora/Typora.exe" ' + "\"" + [data.path] + "\"");
});
```
进入hexo根目录，git bash here 输入hexo new title ,会自动打开markdown编辑软件(我用的是免费的Typora,功能很强大，十分推荐)，然后就可以愉快的编辑le,编辑后，hexo server 本地预览后就可以生成更新部署啦。

![Typora](/images/Typora.png)



参考：[在hexo new之后立即打开Markdown文稿](http://durant35.github.io/2016/02/02/hexo_%E5%9C%A8hexo%20new%E4%B9%8B%E5%90%8E%E7%AB%8B%E5%8D%B3%E6%89%93%E5%BC%80%E6%96%B0%E5%BB%BA%E7%9A%84Markdown%E6%96%87%E7%A8%BF/)


