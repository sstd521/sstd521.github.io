---
layout: post
title: "JavaScript学习笔记01"
date: 2016-10-05 12:37:22
category: JavaScript
tags: [JavaScript]
---



## JavaScript学习笔记01


### 原生函数
>原生函数可以当做构造函数来使用，通过构造函数（如 `new String("abc")`）创建出来的是封装了基本类型值（如 `"abc"`）的封装对象。
>

``` javascript
var  string = new String("abc");
console.log(string);  // [String: 'abc']
console.log(string instanceof String);  // true
console.log(typeof string);  // object
console.log(Object.prototype.toString.call(string));  // [object String]
```

#### 内部属性
> 所有typeof返回值为`"object"`的对象都包含了一个内部属性，可以通过`Object.prototype.toString(..)`查看。

``` javascript
console.log(Object.prototype.toString.call([1,2,3]))  // [object Array]
console.log(Object.prototype.toString.call(true))  // [object Boolean]
console.log(Object.prototype.toString.call(42))  // [object Number]
```

#### 封装对象包装
> 基本类型没有 `.length`和`.toString()`等这样的属性和方法，需要封装对象才可使用，此时JavaScript会为基本类型值自动包装成一个封装对象，浏览器对此也进行了优化，因此应优先考虑用基本类型值，而不是`new  String("abc")`新对象。

``` javascript
var  a = "abc";
console.log(a.length); // 3
console.log(a.toUpperCase()); //ABC
```

>一般不推荐直接使用封装对象，如果想要自行封装基本类型值，可以使用`Object(..)`函数（不带`new`关键字）。

``` javascript
var a = "abc";
var b = new String(a);
var c = Object(a);
console.log(typeof a);  // string
console.log(typeof b);  // object
console.log(typeof c);  // object
console.log(b instanceof String);  // true
console.log(c instanceof String);  // true
console.log(Object.prototype.toString.call(b));  // [object String]
console.log(Object.prototype.toString.call(c)); // [object String]
```

#### 拆封
>如果想要得到封装对象的基本类型值，可以使用valueof()函数:

``` javascript
var a = new String("abc");
var b = new Boolean(true);
a.valueof();  // "abc"
b.valueof();  // true
```

#### 原生函数作为构造函数
> 构造函数`Array(..)`不要求必须带`new`关键字，不带时，系统会自动补上。`Array`构造函数只带一个数字参数的时候，该参数会被当做数组的预设长度，而非一个元素。

``` javascript
var a = Array(3);
console.log(a.length);  // 3
```

> 创建包含`undefined`的数组：`apply(..)`是一个工具，适用于所有对象，它会以一种特殊的方式来调用传递给它的函数。第一个参数是`this`对象，第二个必须是一个数组（或类数组对象，array-like object），数组中的值被用作函数的参数。

``` javascript
var a = Array.apply(null,{ length:3});
console.log(a);  // [ undefined, undefined, undefined ]
```

#### Object(..)、Function(..)、RegExp(..)
> 尽量不要使用`Object(..)、Function(..)、Regexp(..)`，在实际情况中没有必要使用`new Object()`来创建对象，因为这样无法像常量形式那样一次设定多个属性，而必须逐一设定。强烈建议使用常量形式定义正则表达式，语法简单、效率高。

#### Data(..)、Error(..)
> 创建日起对象必须使用`new Date()`。`Date(..)`可以带参数，用来指定日期时间，若不带参数则使用当前的如期和时间。

``` javascript
console.log((new Date()).getDate());  // 28
```

> 构造函数`Error(..)`,带不带`new`关键字都可以。

``` javascript
function foo(x) {
  if (!x)
  throw  Error("x not found");
}
```

#### Symbol(..)
> 基本数据类型，符号(`Symbol`)是具有唯一性的特殊值，用它来命名对象属性不容易导致重名，符号还可以自行定义，`Symbol`以静态属性形式出现，如`Symbol.create`等、不能用`new`关键字创建。

``` javascript
var mysym  = Symbol("abcd");
console.log(mysym);  // Symbol(abcd)
var a = {};
a[mysym] = "apple";
console.log(a[mysym]);  // apple
```

#### 原生原型
>原生构造函数都有自己的`.prototype`对象，如`Array.prototype`等，这些对象包含其对应子类型所有的行为特征。比如将字符串封装成字符串对象，就可以访问`String.prototype`中定义的方法。


>根据文档约定，可将`.prototype.`替换为`#`，如`String.prototype.trim()`简写为`String#trim()`来去掉字符串的前后空格，`Array#concat(..)`合并数组，`Number#tofixed(..)`将数字转换为指定长度的整数字符串，其他对象同样如此。

>`Function.prototype`是一个空函数，`Array.prototype`是一个空数组，`RegExp.prototype`是一个空正则表达式，对未赋值的变量来说，它们是很好的默认值，在ES6中可通过函数声明的内置语法来设置(取而代之)。

