---
title: Hello World
---
Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

<>

## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post"
```
### Inser a image
> 要加入图片，应该在source下建立一个与博文_posts同级别的文件夹 images,将图片放入。路片路径形如：
/hexo/source/images/myImg.png

在博客中插入，要使用相对路径，应写为 /images/myImg.png

``` bash
![Alt text](/images/数据类型.png)
```
或者：
![Alt text](/images/数据类型.png)
``` bash
<img src="/images/mylmg.png" width=50% height=50% align=center/>
```

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/deployment.html)
