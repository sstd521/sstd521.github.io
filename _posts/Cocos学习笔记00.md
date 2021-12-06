---
title: Cocos学习笔记00
tags:
  - Cocos creator
date: 2016-10-05 13:05:13
categories: 游戏
layout: post
description: Cocos Creator 是一款以内容创作为导向的新型游戏开发工具，它完整集成了组件化的 Cocos2d-x WEB 版本，可发布游戏到 Web，iOS，Android，Mac，Windows等平台，更支持直接发布 Cocos Play 平台，把握手机页游渠道的快速发展带来的新机遇。
---



# cocos creator

@(cocos学习笔记)

> Cocos Creator 是一款以内容创作为导向的新型游戏开发工具，它完整集成了组件化的 Cocos2d-x WEB 版本，可发布游戏到 Web，iOS，Android，Mac，Windows等平台，更支持直接发布 Cocos Play 平台，把握手机页游渠道的快速发展带来的新机遇。
> ![Alt text](/images/structure.png)

> Cocos2d-x 中，开发方式是以代码来驱动,在 Cocos Creator 框架中，所有场景都会被序列化为纯数据，在运行时使用这些纯数据来重新构建场景，界面，动画甚至组件等元素。 Cocos Creator 提供的是更加彻底的数据驱动方式，在编辑器中编辑的所有信息都会被序列化到数据文件中，在运行时，引擎会通过反序列化的方式将数据直接转化为对象。引擎中类的属性是可直接被序列化和反序列化的，不需要通过任何映射关系来转化。
## 序列化和反序列化
> 序列化和反序列化支持 Cocos Creator 中类的绝大多数公有属性，这些属性通过属性检查器面板暴露给开发者。开发者可以在编辑器中随意修改并保存，保存的过程就是将资源和场景数据序列化到资源数据库（Asset Database）中。反之，在加载场景的过程中，反序列化机制会根据场景数据实例化相应的对象，并还原编辑器中设置的所有属性。
> 数据驱动的强大之处在于，用户自己编辑的组件也可以进行属性声明。这些属性可以在编辑器中被编辑，也会被保存到场景数据中，最后在运行时被反序列化到游戏场景中。资源数据库在编辑器中以资源管理器的形式呈现。
>
> Cocos Creator 的工作流是内容创作为导向的。数据驱动使得场景可以被自由得进行编辑，不仅可以可视化得搭建整个场景，还可以对游戏逻辑进行编辑（编辑组件暴露出的属性）。这使得一切的入口点变成了编辑器，而不是代码。
> ![Alt text](/images/edit_e.png)

## 逻辑树和渲染树
>开发者在编辑器中搭建的节点树和挂载的组件共同组成了逻辑树，其中节点构成实体单位，组件负责逻辑。逻辑树会生成场景的渲染树，决定渲染顺序，不过开发者并不需要关心这些，只要在编辑器中保障显示效果正确即可。在编辑器的 Node Tree 层级管理器中，开发者可以调整逻辑树的顺序和父子关系。
## 场景管理
> 在 Cocos Creator 中，开发者在编辑器中搭建完的场景，所有数据会保存为一个 scene-name.fire 文件，存在资源数据库（Asset Database）中。开发者可以通过 cc.director.loadScene 来加载一个场景资源，参见具体范例：
``` javascript
var sceneName = 'scene-name';
var onLaunched = function () {
    console.log('Scene ' + sceneName + ' launched');
};
// 第一个参数为场景的名字，第二个可选参数为场景加载后的回调函数
cc.director.loadScene(sceneName, onLaunched);
```
此外，我们提供了访问场景节点的接口：
``` javascript
// 获取逻辑树的场景节点
var logicScene = cc.director.getScene();
```
> 在 Cocos Creator 中，游戏场景（Scene）是开发时组织游戏内容的中心，也是呈现给玩家所有游戏内容的载体。
### Canvas
> 打开场景后，层级管理器中会显示当前场景中的所有节点和他们的层级关系，Canvas可以被称为画布节点或渲染根节点。
>
> 组件系统变成了整个引擎的核心，组件可以以各种各样的方式扩展逻辑节点的功能。甚至可以说，逻辑节点本身不应该包含任何实际游戏逻辑，它应该由各种逻辑组件组合出完整的逻辑。

> Cocos Creator 中，子节点坐标系的坐标原点就是父节点的坐标位置，也就是其锚点的位置。这样的修改对于编辑器更友好。
>![Alt text](/images/cocos_p.png)


### Texture 和 SpriteFrame 资源类型
> SpriteFrame 是核心渲染组件 Sprite 所使用的资源，设置或替换 Sprite 组件中的 spriteFrame 属性，就可以切换显示的图像。
### 图集资源（Atlas）
> 图集（Atlas）也称作 Sprite Sheet，是游戏开发中常见的一种美术资源。图集是通过专门的工具如TexturePacker等将多张图片合并成一张大图，并通过 plist 等格式的文件索引的资源。可供 Cocos Creator 使用的图集资源由 plist 和 png 文件组成。
>
> **在游戏中使用多张图片合成的图集作为美术资源，有以下优势：**
> 合成图集时会去除每张图片周围的空白区域，加上可以在整体上实施各种优化算法，合成图集后可以大大减少游戏包体和内存占用
> 多个 Sprite 如果渲染的是来自同一张图集的图片时，这些 Sprite 可以使用同一个渲染批次来处理，大大减少 CPU 的运算时间，提高运行效率。

### 字体资源
>Cocos Creator 制作的游戏中可以使用三类字体资源：系统字体，动态字体和位图字体。

### 使用 cc.Class 声明类型
> cc.Class 是一个很常用的 API，用于声明 Cocos Creator 中的类，为了方便区分，我们把使用 cc.Class 声明的类叫做 CCClass。
#### 定义 CCClass
>调用 cc.Class，传入一个原型对象，在原型对象中以`键值对`的形式设定所需的类型参数，就能创建出所需要的类。

```
var Sprite = cc.Class({
    name: "sprite"
});
```
> 以上代码用 cc.Class 创建了一个类型，并且赋给了 Sprite 变量。同时还将类名设为 "sprite"，类名用于序列化，一般可以省略。
####    实例化:
> Sprite 变量保存的是一个 JavaScript 构造函数，可以直接 new 出一个对象：

```
var obj = new Sprite();
```

