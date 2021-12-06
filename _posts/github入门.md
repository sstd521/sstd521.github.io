---
title: github入门
tags:
  - github
date: 2016-10-31 19:34:54
categories: 代码托管
description: github入门
layout: post

---

![github](http://i.imgur.com/xwgYY5O.jpg)

### *Welcome to Github World*
> GitHub 是为开发者提供 Git 仓库的托管服务。这是一个让开发者与 朋友、同事、同学及陌生人共享代码的完美场所。
#### GitHub 与 Git 的区别
> GitHub 与 Git 是完全不同的两个东西。
> 在 Git 中，开发者将源代码存入名叫“Git 仓库”的资料库中并加以使用。而 GitHub 则是在网络上提供 Git 仓库的一项服务。也就是说，GitHub 上公开的软件源代码全都由 Git 进行管理。

理解 Git，是熟练运用 GitHub 的关键所在。

**Pull Request** 是指开发者在本地对源代码进行更改后，向 GitHub 中托管的 Git 仓库请求合并的功能。开发者可以在 Pull Request 上通过评论交流，来更改源代码，并公开更改的细节，然后向仓库提交合并请求。而且，如果请求的更改与项目的初衷相违，也可以选择拒绝合并。GitHub 的 Pull Request 不但能轻松查看源代码的前后差别，还可以对指定的一行代码进行评论，使代码审查的工作变得非常便捷。

#### 社会化编程
革命领导者 GitHub 的口号便是“社会化编程”。 
Github让世界上任何人都可以比从前更加容易地获得源代码，将其自由更改并加以公开。
- **不要闭目塞听，要接触不同的文化**
  在工作中接触非公开代码的职业程序员们，更应该接触世界上的不同文化，拓展见闻。如果只在公司这一封闭的小世界中敲代码，往往在不知不觉间，手中的技术就变得陈腐不堪了。
- **GitHub 最大的特征是“面向人”**
  GitHub 除项目之外，还可以把注意力集中到人身上。我们不但能阅览一个人公开的所有源代码，只要查看其控制面板中的 News Feed，还能知道他对哪些仓库感兴趣，什么时候做过提交等。一个人在 GitHub进行的开发是一目了然的。
#### GitHub 提供的主要功能
1. Git 仓库，我们可以免费建立任意个 GitHub 提供的 Git 仓库。
2. Organization，个人使用时只要使用个人账户就足够了，但如果是公司，建议使用 Organization 账户。它的优点在于可以统一管理账户和权限，还能统一支付一些费用。
3. Issue，Issue 功能，是将一个任务或问题分配给一个 Issue 进行追踪和管理的功能。可以像 BUG 管理系统或 TiDD（Ticket-driven Development）的Ticket 一样使用。在 GitHub 上，每当进行Pull Request，都会同时创建一个 Issue。
>  每一个功能更改或修正都对应一个 Issue，讨论或修正都以这个Issue 为中心进行。只要查看 Issue，就能知道和这个更改相关的一切信息，并以此进行管理。

4. Wiki，通过 Wiki 功能，任何人都能随时对一篇文章进行更改并保存，因此可以多人共同完成一篇文章。该功能常用在开发文档或手册的编写
   中。
> Wiki 页也是作为 Git 仓库进行管理的，改版的历史记录会被切实保存下来，使用者可以放心改写。由于其支持克隆至本地进行编辑，所以程序员使用时可以不必开启浏览器。

5.  Pull Request，开发者向 GitHub 的仓库推送更改或功能添加后，可以通过 PullRequest 功能向别人的仓库提出申请，请求对方合并。
> Pull Request 送出后，目标仓库的管理者等人将能够查看 PullRequest 的内容及其中包含的代码更改。
> 同时，GitHub 还提供了对 Pull Request 和源代码前后差别进行讨论的功能。通过此功能，可以以**行**为单位对源代码添加评论，让程序员之间高效地交流。

### Git 的导入
>GitHub 的核心功能是 Git 仓库管理 。因此，使用 GitHub 之前必须先掌握 Git 的相关知识，同时本地的设备还要安装 Git 的环境。
#### 版本管理
> 版本管理就是管理更新的历史记录。它为我们提供了一些在软件开发过程中必不可少的功能，例如记录一款软件添加或更改源代码的过程，回滚到特定阶段，恢复误删除的文件等。
##### 集中型与分散型
以 Subversion 为代表的集中型将所有数据集中存放在服务器当中，有便于管理的优点。但是一旦开发者所处的环境不能连接服务器，就无法获取最新的源代码，开发也就几乎无法进行。服务器宕机时也是同样的道理，而且万一服务器故障导致数据消失，恐怕开发者就再也见不到最新的源代码了。



## 社区功能
Follow（关注）别人
>  Follow 的用户的活动就会显示在您的控制面板页面
>  中。您可以通过这种方法知道那个人在 GitHub 上都做了些什么。

也可以使用 Watch 功能获取最新的开发信息。如果您经
常使用的某个软件正在 GitHub 上进行开发，不妨去 Watch 一下。
## 新建仓库
### Initialize this repository with a README
> 在 Initialize this repository with a README 选项上打钩，随后
> GitHub 会自动初始化仓库并设置 README 文件，让用户可以立刻clone 这个仓库。如果想向 GitHub 添加手中已有的 Git 仓库，建议不要勾选，直接手动 push。<small>README.md 在初始化时已经生成好了。README.md 文件的内容
> 会自动显示在仓库的首页当中。因此，人们一般会在这个文件中标明本
> 仓库所包含的软件的概要、使用流程、许可协议等信息。如果使用
> Markdown 语法进行描述，还可以添加标记，提高可读性。
## **基本操作**
##  git init——初始化仓库
> 要使用 Git 进行版本管理，必须先初始化仓库。Git 是使用 git
> init命令进行初始化的。

``` 
$ mkdir git-tutorial
$ cd git-tutorial
$ git init
Initialized empty Git repository in /Users/hirocaster/github/github-book
/git-tutorial/.git/
```
<hr>
> 如果初始化成功，执行了 git init命令的目录下就会生成 .git 目录。这个 .git 目录里存储着管理当前目录内容所需的仓库数据。

### git status——查看仓库的状态
> git status命令用于显示 Git 仓库的状态。这是一个十分常用的命令，请务必牢记。
###   git add——向暂存区中添加文件
> 如果只是用 Git 仓库的工作树创建了文件，那么该文件并不会被记入 Git 仓库的版本管理对象当中。因此我们用 git status命令查看README.md 文件时，它会显示在 Untracked files 里。要想让文件成为 Git 仓库的管理对象，就需要用 git add命令将其加入暂存区（Stage 或者 Index）中。暂存区是提交之前的一个临时区域。
### git commit——保存仓库的历史记录
> git commit命令可以将当前暂存区中的文件实际保存到仓库的历史记录中。通过这些记录，我们就可以在工作树中复原文件。

- 记述一行提交信息

我们来实际运行一下 git commit命令。

```
$ git commit -m "First commit"
[master (root-commit) 9f129ba] First commit
1 file changed, 0 insertions(+), 0 deletions(-)
create mode 100644 README.md
```

-m 参数后的 "First commit"称作提交信息，是对这个提交的概述。

- 记述详细提交信息

如果想要记述得更加详
细，请不加 -m，直接执行 git commit命令。
执行后编辑器就会启
动，并显示如下结果。

```
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# On branch master
#
# Initial commit
#
# Changes to be committed:
# (use "git rm --cached <file>..." to unstage)
#
# new file: README.md
#
```

在编辑器中记述提交信息的格式如下。
第一行：用一行文字简述提交的更改内容
第二行：空行
第三行以后：记述更改的原因和详细内容

在以 #（井号）标为注释的 Changes to be committed（要提交的更改）栏中，可以查看本次提交中包含的文件。
- 中止提交
  如果在编辑器启动后想中止提交，请将提交信息留空并直接关闭编
  辑器，随后提交就会被中止。
### git log——查看提交日志
> git log命令可以查看以往仓库中提交的日志。

```
$ git log
commit 9f129bae19b2c82fb4e98cde5890e52a6c546922
Author: hirocaster <hohtsuka@gmail.com>
Date: Sun May 5 16:06:49 2013 +0900
First commit
```

如上图所示，屏幕显示了刚刚的提交操作。commit 栏旁边显示的“9f129b……”是指向这个提交的哈希值。Git 的其他命令中，在指向提交时会用到这个哈希值。
Author 栏中显示我们给 Git 设置的用户名和邮箱地址。Date 栏中显示提交执行的日期和时间。再往下就是该提交的提交信息。

- 只显示提交信息的第一行
  如果只想让程序显示第一行简述信息，可以在 git log命令后加上 --pretty=short。这样一来开发人员就能够更轻松地把握多个提交。

```
$ git log --pretty=short
commit 9f129bae19b2c82fb4e98cde5890e52a6c546922
Author: hirocaster <hohtsuka@gmail.com>
First commit
```
- 只显示指定目录、文件的日志
  只要在 git log命令后加上目录名，便会只显示该目录下的日志。
  如果加的是文件名，就会只显示与该文件相关的日志。
```
$ git log README.md
```
- 显示文件的改动
  如果想查看**提交**所带来的改动，可以加上 -p参数，文件的前后差别就会显示在提交信息之后。

```
$ git log -p
```

比如，执行下面的命令，就可以只查看 README.md 文件的提交日志以及提交前后的差别。

```
$ git log -p README.md
```
### git diff——查看更改前后的差别
> git diff命令可以查看工作树、暂存区、最新提交之间的差别。

我们在刚刚提交的 README.md 中写点东西。
```
# Git教程
```
- 查看工作树和暂存区的差别
  **执行 git diff命令，查看当前工作树与暂存区的差别。**

```
$ git diff
diff --git a/README.md b/README.md
index e69de29..cb5dc9f 100644
--- a/README.md
+++ b/README.md
@@ -0,0 +1 @@
+# Git教程
```
由于我们尚未用 git add命令向暂存区添加任何东西，所以程序只会显示工作树与最新提交状态之间的差别。
> “+”号标出的是新添加的行，被删除的行则用“-”号标出。

- 查看工作树和最新提交的差别
  如果现在执行 git diff命令，由于工作树和暂存区的状态并无差别，结果什么都不会显示。要查看与最新提交的差别，请执行以下命令。

```
$ git diff HEAD
diff --git a/README.md b/README.md
index e69de29..cb5dc9f 100644
--- a/README.md
+++ b/README.md
@@ -0,0 +1 @@
+# Git教程
```

不妨养成这样一个好习惯：在执行 `git commit`命令**之前**先执行
`git diff HEAD`命令，查看本次提交与上次提交之间有什么差别，等确认完毕后再进行提交。**这里的 `HEAD` 是指向当前分支中最新一次提交的指针。**