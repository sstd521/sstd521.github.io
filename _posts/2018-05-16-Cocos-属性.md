---
title: Cocos 属性
tags:
  - Cocos
date: 2016-12-20 13:23:40
categories: Cocos
description: Cocos 属性属性介绍
layout: post
---
# Cocos 属性
智能机的普及带动手机玩家的快速增长，预计2014年依然会保持较快增幅。

### 属性
完整声明

有些情况下，我们需要为属性声明添加参数，这些参数控制了属性在 属性检查器 中的显示方式，以及属性在场景序列化过程中的行为。例如：

```javascript
properties: {
score: {
default: 0,
displayName: "Score (player)",
tooltip: "The score of player",
}
}
```

> 以上代码为 score 属性设置了三个参数 default, displayName 和 tooltip。这几个参数分别指定了 score 的默认值为 0，在 属性检查器 里，其属性名将显示为：“Score (player)”，并且当鼠标移到参数上时，显示对应的 Tooltip。

下面是常用参数：
 default: 设置属性的默认值，这个默认值仅在组件第一次添加到节点上时才会用到
type: 限定属性的数据类型，详见 CCClass 进阶参考：type 参数
visible: 设为 false 则不在 属性检查器 面板中显示该属性
serializable: 设为 false 则不序列化（保存）该属性
displayName: 在 属性检查器 面板中显示成指定名字
tooltip: 在 属性检查器 面板中添加属性的 Tooltip

type 参数
当默认值是一个枚举（cc.Enum）时，由于枚举值本身其实也是一个数字（number），所以要将 type 设置为枚举类型，才能在 属性检查器 中显示为枚举下拉框。

```javascript
wrap: {
   default: Texture.WrapMode.Clamp,
   type: Texture.WrapMode
}
```

url 参数

如果属性是用来访问 Raw Asset 资源的 url，为了能在 属性检查器 中选取资源，或者能正确序列化，你需要指定 url 参数：

```javascript
texture: {
default: "",
url: cc.Texture2D
},
```
override 参数

所有属性都将被子类继承，如果子类要覆盖父类同名属性，需要显式设置 override 参数，否则会有重名警告：

```
_id: {
default: "",
tooltip: "my id",
override: true
},
name: {
get: function () {
return this._name;
},
displayName: "Name",
override: true
}
```

属性延迟定义

如果两个类相互引用，脚本加载阶段就会出现循环引用，循环引用将导致脚本加载出错：

Game.js

```
var Item = require("Item");

 var Game = cc.Class({
 properties: {
 item: {
 default: null,
 type: Item
 }
 }
 });
 module.exports = Game;
```

Item.js

```
 var Game = require("Game");
 var Item = cc.Class({
 properties: {
 game: {
 default: null,
 type: Game
 }
 }
 });
 module.exports = Item;
```

上面两个脚本加载时，由于它们在 require 的过程中形成了闭环，因此加载会出现循环引用的错误，循环引用时 type 就会变为 undefined。 因此我们提倡使用以下的属性定义方式：

Game.js


```
 var Game = cc.Class({
 properties: () =\> ({
 item: {
 default: null,
 type: require("Item")
 }
 })
 });

 module.exports = Game;
```


Item.js

``` javascript
 var Item = cc.Class({
 properties: () =\> ({
 game: {
 default: null,
 type: require("Game")
 }
 })
 });

 module.exports = Item;
```

这种方式就是将 properties 指定为一个 ES6 的箭头函数（lambda 表达式），箭头函数的内容在脚本加载过程中并不会同步执行，而是会被 CCClass 以异步的形式在所有脚本加载成功后才调用。因此加载过程中并不会出现循环引用，属性都可以正常初始化。

箭头函数的用法符合 JavaScript 的 ES6 标准，并且 Creator 会自动将 ES6 转义为 ES5，用户不用担心浏览器的兼容问题。
你可以这样来理解箭头函数：


// 箭头函数支持省略掉 `return` 语句，我们推荐的是这种省略后的写法：

```
properties: () =\> ({    // \<- 箭头右边的括号 "(" 不可省略
game: {
default: null,
type: require("Game")
}
})
```


// 如果要完整写出 `return`，那么上面的写法等价于：

```
properties: () =\> {
return {
game: {
default: null,
type: require("Game")
}
};      // \<- 这里 return 的内容，就是原先箭头右边括号里的部分
}
```
`// 我们也可以不用箭头函数，而是用普通的匿名函数：

```
properties: function () {
return {
game: {
default: null,
type: require("Game")
}
};
}
```

