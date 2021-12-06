---
title: 你不知道的JavaScript(上卷)学习笔记
tags:
  - JavaScript
date: 2016-10-13 14:35:54
categories: 前端
layout: post
description: 你不知道的JavaScript(上卷)学习笔记精华
---

### 函数作用域
#### 包装函数
 包装函数的声明以 `(function...` 而不仅是以 `function...` 开始。函数会被当作函数表达式而不是一个标准的函数声明来处理。

``` javascript
var a = 2;
(function foo()
        {
            var a = 3;
            console.log(a);  // 3
        })();
console.log(a);  // 2
```
> 区分函数声明和表达式最简单的方法是看 `function` 关键字出现在声明中的位置（不仅仅是一行代码，而是整个声明中的位置）。如果 `function` 是声明中的第一个词，那么就是一个函数声明，否则就是一个函数表达式。

>  `(function foo(){ .. })` 作为函数表达式意味着 `foo` 只能在 `..` 所代表的位置中被访问，外部作用域则不行。 `foo` 变量名被隐藏在自身中意味着不会非必要地污染外部作用域。

#### 立即执行函数表达式(IIFE)
 由于函数被包含在一对 `( )` 括号内部，因此成为了一个表达式，通过在末尾加上另外一个
`( )` 可以立即执行这个函数，比如 `(function foo(){ .. })()` 。第一个 `( )` 将函数变成表达式，第二个 `( )` 执行了这个函数。
> 函数名对 IIFE 不是必须的，IIFE 最常见的用法是使用一个匿名函数表达式。

很多人都更喜欢另一个改进的形式: `(function(){ .. }())` 。
IIFE 的另一个非常普遍的进阶用法是把它们当作函数调用并传递参数进去。
例如：

``` javascript
var a = 2;
(function IIFE( global ) {  // 形参
var a = 3;
console.log( a );  // 3
console.log( global.a );  // 2
})( window );  // 实参
console.log( a );  // 2
```
将 `window` 对象的引用传递进去，但将参数命名为 `global` ，因此在代码风格上对全局对象的引用变得比引用一个没有“全局”字样的变量更加清晰。
将一个参数命名为 `undefined` ，但是在对应的位置不传入任何值，这样就可以保证在代码块中 `undefined` 标识符的值真的是 `undefined` ：

``` javascript
undefined = true; // 给其他代码挖了一个大坑！绝对不要这样做！
(function IIFE( undefined ) {
var a;
if (a === undefined) {
console.log( "Undefined is safe here!" );
}
})();
```
> IIFE 还有一种变化的用途是倒置代码的运行顺序，将需要运行的函数放在第二位，在 IIFE执行之后当作参数传递进去。

``` javascript
(function IIFE(def)
    {
        def(window);
    })(function def(global)
{
    var a = 3;
    console.log(a); // 3
    console.log(global.a); // 2
});
```
  *函数表达式 `def` 定义在片段的第二部分，然后当作参数（这个参数也叫作 `def` ）被传递进IIFE 函数定义的第一部分中。最后，参数 `def` （也就是传递进去的函数）被调用，并将`window` 传入当作 `global` 参数的值 。*

####  块作用域
> 使用 `var` 声明变量时，它写在哪里都是一样的，因为它们最终都会属于外部作用域。

``` javascript
var foo = true;
if (foo)
    {
        var bar = foo * 2;
    }
console.log(bar);  // 2
```
#### let
>  `let` 关键字可以将变量绑定到所在的任意作用域中（通常是 `{ .. }` 内部）。换句话说， `let`把声明的变量隐式在了所在的块作用域。

``` javascript
var foo = true;
if (foo)
    {
        let bar = foo * 2;
        console.log(bar);
    }
console.log(bar); // ReferenceErrorar;
```
### 提升
> 所有的声明（变量和函数）都会被“移动”到各自作用域的最顶端，这个过程被称为提升。变量和函数声明会在任何代码被执行前首先被处理，而赋值或其他运行逻辑会留在原地 。

#### 声明提升

``` javascript
foo();
function foo() {
console.log( a ); // undefined
var a = 2;
}
```

  `foo` 函数的声明（这个例子还包括实际函数的隐含值）被提升了，因此第一行中的调用可
以正常执行。
这段代码实际上会被理解为下面的形式：

``` javascript
function foo() {
var a;
console.log( a ); // undefined
a = 2;
}
foo();
```
*可以看到，函数声明会被提升，但是函数表达式却不会被提升。*
> 即使是具名的函数表达式，名称标识符在赋值之前也无法在所在作用域中使用：

``` javascript
foo(); // TypeError
bar(); // ReferenceError
var foo = function bar() {
// ...
};
```
这个代码片段经过提升后，实际上会被理解为以下形式：

``` javascript
var foo;
foo(); // TypeError
bar(); // ReferenceError
foo = function() {
var bar = ...self...
// ...
}
```
*`foo()` 由于对 `undefined` 值进行函数调用而导致非法操作，因此抛出 `TypeError` 异常。*
#### 函数优先
> 函数声明和变量声明都会被提升，但函数会首先被提升，然后才是变量。

``` javascript
foo(); // 1
var foo;
function foo() {
console.log( 1 );
}
foo = function() {
console.log( 2 );
};
```
会输出 1 而不是 2 ！这个代码片段会被引擎理解为如下形式：

``` javascript
function foo() {
console.log( 1 );
}
foo(); // 1
foo = function() {
console.log( 2 );
};
```
 *`var foo` 尽管出现在 `function foo()...` 的声明之前，但它是重复的声明（因此被忽略了），因为函数声明会被提升到普通变量之前。*
 **如果有重复的声明，后面的会覆盖前面的声明。**

###  作用域闭包
> 闭包：当函数可以记住并访问所在的词法作用域，即函数是在当前词法作用域之外执行，这时就产生了闭包。

> 模块有两个主要特征：（1）为创建内部作用域而调用了一个包装函数；（2）包装函数的返回值必须至少包括一个对内部函数的引用，这样就会创建涵盖整个包装函数内部作用域的闭包。

``` javascript
var fn;
function foo() {
var a = 2;
function baz() {
console.log( a );
}
fn = baz; // 将 baz 分配给全局变量
}
function bar() {
fn(); // 这就是闭包！
}
foo();
bar(); // 2
```

*将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包。*

> 词法作用域是一套关于引擎如何寻找变量以及会在何处找到变量的规则。词法作用域最重要的特征是它的定义过程发生在代码的书写阶段（假设你没有使用`eval()` 或 `with` ）。

> 动态作用域并不关心函数和作用域是如何声明以及在何处声明的，只关心它们从何处调用。换句话说，作用域链是基于调用栈的，而不是代码中的作用域嵌套。

``` javascript
function foo() {
console.log( a ); // 2
}
function bar() {
var a = 3;
foo();
}
var a = 2;
bar();
```
> 需要明确的是，事实上 JavaScript 并不具有动态作用域。它只有词法作用域，简单明了。但是 this 机制某种程度上很像动态作用域。

> 主要区别：词法作用域是在写代码或者说定义时确定的，而动态作用域是在运行时确定的。（ this 也是！）词法作用域关注函数在何处声明，而动态作用域关注函数从何处调用。

####  this 词法
> 箭头函数在涉及 this 绑定时的行为和普通函数的行为完全不一致。它放弃了所有普通 this 绑定的规则，取而代之的是用当前的词法作用域覆盖了 this 本来的值。

``` javascript
function foo(num) {
console.log( "foo: " + num );
// 记录 foo 被调用的次数
// 注意，在当前的调用方式下（参见下方代码），this 确实指向 foo
this.count++;
}
foo.count = 0;
var i;
for (i=0; i<10; i++) {
if (i > 5) {
// 使用 call(..) 可以确保 this 指向函数对象 foo 本身
foo.call( foo, i );
}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9
// foo 被调用了多少次？
console.log( foo.count ); // 4
```
>  this 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。 this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

####  this 全面解析
在理解 this 的绑定过程之前，首先要理解调用位置：调用位置就是函数在代码中被调用的
位置（而不是声明的位置）。
#### 默认绑定
* this 的默认绑定， 指向全局对象。
* 严格模式（ strict mode ），那么全局对象将无法使用默认绑定，因此 this 会绑定
  到 undefined 。
``` javascript
function foo() {
"use strict";
console.log( this.a );
}
var a = 2;
foo(); // TypeError: this is undefined
```
#### 隐式绑定
* 当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。
* 对象属性引用链中只有最顶层或者说最后一层会影响调用位置。
* 在分析隐式绑定时，我们必须在一个对象内部包含一个指向函数的属性，并通过这个属性间接引用函数，从而把 this 间接（隐式）绑定到这个对象上。

``` javascript
function foo() {
console.log( this.a );
}
var obj2 = {
a: 42,
foo: foo
};
var obj1 = {
a: 2,
obj2: obj2
};
obj1.obj2.foo(); // 42
```
#### 显式绑定

``` javascript
JavaScript 环境中内置的 setTimeout() 函数实现和下面的伪代码类似：
function setTimeout(fn,delay) {
// 等待 delay 毫秒
fn(); // <-- 调用位置！
}
```

可以使用函数的 call(..) 和apply(..) 方法。
> 它们的第一个参数是一个对象，它们会把这个对象绑定到this ，接着在调用函数时指定这个 this 。因为你可以直接指定 this 的绑定对象，因此我们称之为显式绑定。

``` javascript
function foo() {
console.log( this.a );
}
var obj = {
a:2
};
foo.call( obj ); // 2
```
##### 硬绑定
我们创建了函数 bar() ，并在它的内部手动调用了 foo.apply( obj, arguments ) ，因此强制把 foo 的 this 绑定到了 obj 。无论之后如何调用函数 bar ，它总会手动在 obj 上调用 foo 。这种绑定是一种显式的强制绑定，因此我们称之为硬绑定。

``` javascript
function foo(something) {
console.log( this.a, something );
return this.a + something;
}
var obj = {
a:2
};
var bar = function() {
return foo.apply( obj, arguments );
};
var b = bar( 3 ); // 2 3
console.log( b ); // 5
```
tips:
> 如果你把 null 或者 undefined 作为 this 的绑定对象传入 call 、 apply 或者 bind ，这些值在调用时会被忽略，实际应用的是默认绑定规则。

``` javascript
function foo() {
console.log( this.a );
}
var a = 2;
foo.call( null ); // 2
```
使用 `null` 来忽略 `this` 绑定可能产生一些副作用。建议使用空对象，在 JavaScript 中创建一个空对象最简单的方法都是`Object.create(null)`，`Object.create(null)` 和 `{}` 很像，但是并不会创建 `Object.prototype` 这个委托，所以它比 `{}` “更空”：

``` javascript
function foo(a,b) {
console.log( "a:" + a + ", b:" + b );
}
// 我们的 DMZ 空对象
var ø = Object.create( null );
// 把数组展开成参数
foo.apply( ø, [2, 3] ); // a:2, b:3
// 使用 bind(..) 进行柯里化
var bar = foo.bind( ø, 2 );
bar( 3 ); // a:2, b:3
```
> 使用变量名 `ø` 不仅让函数变得更加“安全”，而且可以提高代码的可读性，因为 `ø` 表示“我希望 `this` 是空”，这比 `null` 的含义更清楚。

#### new 绑定
> 在 JavaScript 中，构造函数只是一些
> 使用 `new` 操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。实际上，它们甚至都不能说是一种特殊的函数类型，它们只是被 `new` 操作符调用的普通函数而已。

> 包括内置对象函数（比如 `Number(..)` ）在内的所有函数都可以用 `new` 来调用，这种函数调用被称为构造函数调用。这里有一个重要但是非常细微的区别：实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”。

使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
1. 创建（或者说构造）一个全新的对象。
2. 这个新对象会被执行 [[ 原型 ]] 连接。
3. 这个新对象会绑定到函数调用的 this 。
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

#### 四条规则判断 this 的绑定对象：
如果要判断一个运行中函数的 this 绑定，就需要找到这个函数的直接调用位置。找到之后就可以顺序应用下面这四条规则来判断 this 的绑定对象。
1. 由 new 调用？绑定到新创建的对象。
2. 由 call 或者 apply （或者 bind ）调用？绑定到指定的对象。
3. 由上下文对象调用？绑定到那个上下文对象。
4. 默认：在严格模式下绑定到 undefined ，否则绑定到全局对象。
### 对象
#### 语法
对象可以通过两种形式定义：声明（文字）形式和构造形式。
对象的文字语法大概是这样：

``` javascript
var myObj = {
key: value
// ...
};
```
构造形式大概是这样：

``` javascript
var myObj = new Object();
myObj.key = value;
```
> 构造形式和文字形式生成的对象是一样的。唯一的区别是，在文字声明中你可以添加多个键 / 值对，但是在构造形式中你必须逐个添加属性。

####  类型
内置对象：
String 
Number 
Boolean 
Object 
Function 
Array 
Date 
RegExp 
Error

> null 和 undefined 没有对应的构造形式，它们只有文字形式。相反， Date 只有构造，没有文字形式。

> 对于 Object 、 Array 、 Function 和 RegExp （正则表达式）来说，无论使用文字形式还是构造形式，它们都是对象，不是字面量。由于这两种形式都可以创建对象，所以我们首选更简单的文字形式。建议只在需要那些额外选项时使用构造形式。

> 一般是在抛出异常时被自动创建。也可以使用 new Error(..) 这种构造形式来创建，不过一般来说用不着。

#### 内容
> 对象的内容是由一些存储在特定命名位置的（任意类型的）值组成的，我们称之为属性。

存储在对象容器内部的是这些属性的名称，它们就像指针一样，指向这些值真正的存储位置。

``` javascript
var myObject = {
a: 2
};
myObject.a; // 2
myObject["a"]; // 2
```

> 如果要访问 myObject 中 a 位置上的值，我们需要使用 . 操作符或者 [] 操作符。 .a 语法通常被称为“属性访问”， ["a"] 语法通常被称为“键访问”。实际上它们访问的是同一个位置，并且会返回相同的值 2，所以这两个术语是可以互换的。

> 这两种语法的主要区别在于 . 操作符要求属性名满足标识符的命名规范，而 [".."] 语法可以接受任意 UTF-8/Unicode 字符串作为属性名。

> 在对象中，属性名永远都是字符串。如果你使用 string （字面量）以外的其他值作为属性名，那它首先会被转换为一个字符串。即使是数字也不例外。

``` javascript
var myObject = { };
myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";
myObject["true"]; // "foo"
myObject["3"]; // "bar"
myObject["[object Object]"]; // "baz"
```
##### 可计算属性名
ES6 增加了可计算属性名，可以在文字形式中使用 [] 包裹一个表达式来当作属性名：

``` javascript
var prefix = "foo";
var myObject = {
[prefix + "bar"]:"hello",
[prefix + "baz"]: "world"
};
myObject["foobar"]; // hello
myObject["foobaz"]; // world	
```
#### 复制对象
 ES6 定义了 Object.assign(..) 方
法来实现浅复制。 Object.assign(..) 方法的第一个参数是目标对象，之后还可以跟一个
或多个源对象。它会遍历一个或多个源对象的所有可枚举（enumerable）的自有键（owned key，很快会介绍）并把它们复制（使用 = 操作符赋值）到目标对象，最后返回目标对象，就像这样：

``` javascript
var newObj = Object.assign( {}, myObject );
newObj.a; // 2
newObj.b === anotherObject; // true
newObj.c === anotherArray; // true
newObj.d === anotherFunction; // true
```
#### 属性描述符
> 普通的对象属性对应的属性描述符（也被称为“数据描述符”，因为它只保存一个数据值）不仅仅 包含值，还包含另外三个特性： writable （可写）、enumerable （可枚举）和 configurable （可配置）。

``` javascript
var myObject = {};
Object.defineProperty( myObject, "a", {
value: 2,
writable: true,
configurable: true,
enumerable: true
} );
myObject.a; // 2
```
writable决定是否可以更改属性的值。
configurable只要属性是可配置的，就可以使用difineProperty(..)方法修改属性描述符。
> 即便属性是 configurable:false ， 我们还是可以把 writable 的状态由 true 改为 false ，但是无法由 false 改为 true 。
> 除了无法修改， configurable:false 还会禁止删除这个属性。

#### 不变性
* 对象常量
  结合 writable:false 和 configurable:false 就可以创建一个真正的常量属性（不可修改、重定义或者删除）：
``` javascript
var myObject = {};
Object.defineProperty( myObject, "FAVORITE_NUMBER", {
value: 42,
writable: false,
configurable: false
} );
```
* 禁止扩展
  如果想禁止一个对象添加新属性并且保留已有属性，可以使用 Object.preventExtensions(..) ：
``` javascript
var myObject = {
a:2
};
Object.preventExtensions( myObject );
myObject.b = 3;
myObject.b; // undefined
```
在非严格模式下，创建属性 b 会静默失败。在严格模式下，将会抛出 TypeError 错误。
* 密封
> Object.seal(..) 会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用
> Object.preventExtensions(..) 并把所有现有属性标记为 configurable:false 。
> 所以，密封之后不仅不能添加新属性，也不能重新配置或者删除任何现有属性（虽然可以
> 修改属性的值）。
* 冻结
  Object.freeze(..) 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用
  Object.seal(..) 并把所有“数据访问”属性标记为 writable:false ，这样就无法修改它们
  的值。
  这个方法是你可以应用在对象上的级别最高的不可变性，它会禁止对于对象本身及其任意
  直接属性的修改。
####  getter和setter
当给一个属性定义 getter、setter 或者两者都有时，这个属性会被定义为“访问描述符”（和“数据描述符”相对）。对于访问描述符来说，JavaScript 会忽略它们的 value 和writable 特性，取而代之的是关心 set 和 get （还有 configurable 和 enumerable ）特性。

``` javascript
var myObject = {
// 给 a 定义一个 getter
get a() {
return 2;
}
};
Object.defineProperty(
myObject, // 目标对象
"b", // 属性名
{ // 描述符
// 给 b 设置一个 getter
get: function(){ return this.a * 2 },
// 确保 b 会出现在对象的属性列表中
enumerable: true
}
);
myObject.a; // 2
myObject.b; // 4
```
不管是对象文字语法中的 get a() { .. } ，还是 defineProperty(..) 中的显式定义，二者
都会在对象中**创建**一个不包含值的属性，对于这个属性的访问会自动调用一个隐藏函数，
它的返回值会被当作属性访问的返回值：

``` javascript
var myObject = {
// 给 a 定义一个 getter
get a() {
return 2;
}
};
myObject.a = 3;
myObject.a; // 2
```
由于我们只定义了 a 的 getter，所以对 a 的值进行设置时 set 操作会忽略赋值操作，不会抛
出错误。而且即便有合法的 setter，由于我们自定义的 getter 只会返回 2，所以 set 操作是
没有意义的。
为了让属性更合理，还应当定义 setter，和你期望的一样，setter 会覆盖单个属性默认的
[[Put]] （也被称为赋值）操作。通常来说 getter 和 setter 是成对出现的（只定义一个的话
通常会产生意料之外的行为）：

``` javascript
var myObject = {
// 给 a 定义一个 getter
get a() {
return this._a_;
},
// 给 a 定义一个 setter
set a(val) {
this._a_ = val * 2;
}
};
myObject.a = 2;
myObject.a; // 4
```
#### 存在性

``` javascript
var myObject = {
a:2
};
("a" in myObject); // true
("b" in myObject); // false
myObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "b" ); // false
```
> `in` 操作符会检查属性是否在对象及其 `[[Prototype]]` 原型链中。
> `hasOwnProperty(..)` 只会检查属性是否在 `myObject` 对象中，不会检查 `[[Prototype]]` 链。
> 更加强硬的判断方法， `Object.prototype.hasOwnProperty.call(myObject,"a")` ，它借用基础的 `hasOwnProperty(..)` 方法并把它显式绑定到 `myObject` 上。

*看起来 `in` 操作符可以检查容器内是否有某个值，但是它实际上检查的是某个`属性名`是否存在。对于数组来说这个区别非常重要， 4 in [2, 4, 6] 的结果并不是你期待的 True ，因为 [2, 4, 6] 这个数组中包含的属性名是 0、1、2，没有 4。*
> 在数组上应用 for..in 循环有时会产生出人意料的结果，因为这种枚举不仅会包含所有数值索引，还会包含所有可枚举属性。最好只在`对象`上应用for..in 循环，如果要遍历数组就使用传统的 for 循环来遍历数值索引。

也可以通过另一种方式来区分属性是否可枚举：

``` javascript
var myObject = { };
Object.defineProperty(
myObject,
"a",
// 让 a 像普通属性一样可以枚举
{ enumerable: true, value: 2 }
);
Object.defineProperty(
myObject,
"b",
// 让 b 不可枚举
{ enumerable: false, value: 3 }
);
myObject.propertyIsEnumerable( "a" ); // true
myObject.propertyIsEnumerable( "b" ); // false
Object.keys( myObject ); // ["a"]
Object.getOwnPropertyNames( myObject ); // ["a", "b"]
```
> `propertyIsEnumerable(..)` 会检查给定的属性名是否直接存在于对象中（而不是在原型链上）并且满足 `enumerable:true` 。

> `Object.keys(..)` 会返回一个数组，包含所有`可枚举属性`， `Object.getOwnPropertyNames(..)`会返回一个数组，包含所有属性，无论它们是否可枚举。

> `in` 和 `hasOwnProperty(..)` 的区别在于是否查找 `[[Prototype]]` 链，然而， `Object.keys(..)`和 `Object.getOwnPropertyNames(..)` 都只会查找对象直接包含的属性。

#### 遍历
> 使用 for..in 遍历对象是无法直接获取属性值的，因为它实际上遍历的是对象中的所有可枚举属性，需要手动获取属性值。

> 使用 for..in 遍历对象时原理和查找 [[Prototype]] 链类似，任何可以通过原型链访问到（并且是 enumerable ）的属性都会被枚举。使用 in 操作符来检查属性在对象中是否存在时，同样会查找对象的整条原型链（无论属性是否可枚举）

> ES6 增加了一种用来遍历数组的 for..of 循环语法，直接遍历值，而不是数组下标。

``` javascript
var myArray = [ 1, 2, 3 ];
for (var v of myArray) {
console.log( v );
}
// 1
// 2
// 3
```
### 原型
Object.create(..)会创建一个对象并把这个对象的 [[Prototype]] 关联到指定的对象。
所有普通的 [[Prototype]] 链最终都会指向内置的 Object.prototype 。

#### 属性设置与屏蔽
给一个对象设置属性并不仅仅是添加一个新属性或者修改已有的属性值。

    myObject.foo = "bar";
如果 myObject 对象中包含名为 foo 的普通数据访问属性，这条赋值语句只会修改已有的属
性值。
如果 foo 不是直接存在于 myObject 中， [[Prototype]] 链就会被遍历，如果原型链上找不到 foo ， foo 就会被直接添加到 myObject 上。
如果 foo 存在于原型链上层，在于原型链上层时 myObject.foo = "bar" 会出现的三种情况。
1. 如果在 [[Prototype]] 链上层存在名为 foo 的普通数据访问属性并且没有被标记为只读（ writable:false ），那就会直接在 myObject 中添加一个名为 foo 的新属性，它是屏蔽属性。
2. 如果在 [[Prototype]] 链上层存在 foo ，但是它被标记为只读（ writable:false ），那么无法修改已有属性或者在 myObject 上创建屏蔽属性。如果运行在严格模式下，代码会抛出一个错误。否则，这条赋值语句会被忽略。总之，不会发生屏蔽。
3. 如果在 [[Prototype]] 链上层存在 foo 并且它是一个 setter（参见第 3 章），那就一定会调用这个 setter。 foo 不会被添加到（或者说屏蔽于） myObject ，也不会重新定义 foo 这个 setter。


*如果你希望在第二种和第三种情况下也屏蔽 foo ，那就不能使用 = 操作符来赋值，而是使用 Object.defineProperty(..) 来向 myObject 添加 foo 。*
#### “类”函数
JavaScript 中只有对象，对象直接定义自己的行为。
函数特性：所有的函数默认都会拥有一个名为 prototype 的公有并且不可枚举的属性，它会指向另一个对象：

``` javascript
function Foo() {
// ...
}
var a = new Foo();
Object.getPrototypeOf( a ) === Foo.prototype; // true
```
new Foo() 会生成一个新对象（我们称之为 a ），这个新对象的内部链接 [[Prototype]] 关联
的是 Foo.prototype 对象。
 new Foo() 只是间接创建了一个关联到其他对象的新对象。
 JavaScript 会在两个对象之间创建一个关联，这样一个对象就可以通过委托访问另一个对象的属性和函数。
 在普通的函数调用前面加上 new 关键字之后，就会把这个函数调用变成一个“构造函数调用”。实际上， new 会劫持所有普通函数并用构造对象的形式来调用它。
 函数不是构造函数，但是当且仅当使用 new 时，函数调用会变成“构造函数调用”。

``` javascript
function Foo(name) {
this.name = name;
}
Foo.prototype.myName = function() {
return this.name;
};
var a = new Foo( "a" );
var b = new Foo( "b" );
a.myName(); // "a"
b.myName(); // "b"
```
Foo.prototype.myName = ... 可能个更有趣的技巧，它会给 Foo.prototype 对象添加一
个属性（函数）。现在， a.myName() 可以正常工作。
#### 继承
要创建一个合适的关联对象，我们必须使用 Object.create(..)
对比一下两种把 Bar.prototype 关联到 Foo.prototype 的方法：

``` javascript
// ES6 之前需要抛弃默认的 Bar.prototype
Bar.ptototype = Object.create( Foo.prototype );
// ES6 开始可以直接修改现有的 Bar.prototype
Object.setPrototypeOf( Bar.prototype, Foo.prototype );
```

如果忽略掉 Object.create(..) 方法带来的轻微性能损失（抛弃的对象需要进行垃圾回
收），它实际上比 ES6 及其之后的方法更短而且可读性更高。
#### 检查“类”关系
``` javascript
function Foo() {
// ...
}
Foo.prototype.blah = ...;
var a = new Foo();
a instanceof Foo; // true
```
instanceof 操作符的左操作数是一个普通的对象，右操作数是一个函数。 instanceof 回答的问题是：在 a 的整条[[Prototype]] 链中是否有指向 Foo.prototype 的对象，这个方法**只能处理对象（ a ）和函数**（带 .prototype 引用的 Foo ）之间的关系。

判断 [[Prototype]] 反射的方法：

    Foo.prototype.isPrototypeOf( a ); // true
我们只需要一个可以用来判断的对象（本例中Foo.prototype ）就行。 isPrototypeOf(..) 回答的问题是：在 a 的整条 [[Prototype]] 链中是否出现过 Foo.prototype ？
语言内置的 isPrototypeOf(..) 函数就是我们的 isRelatedTo(..) 函数。
我们也可以直接获取一个对象的 [[Prototype]] 链。在 ES5中，标准的方法是：

```javascript
Object.getPrototypeOf( a );
```

可以验证一下，这个对象引用是否和我们想的一样：

```javascript
Object.getPrototypeOf( a ) === Foo.prototype; // true
```
#### 对象关联
Object.create(..) 会创建一个新对象（ bar ）并把它关联到我们指定的对象（ foo ），这样我们就可以充分发挥 [[Prototype]] 机制的威力（委托）并且避免不必要的麻烦（比如使用 new 的构造函数调用会生成 .prototype 和 .constructor 引用）。
> Object.create(null) 会 创 建 一 个 拥 有 空（ 或 者 说 null ） [[Prototype]]链接的对象，这个对象无法进行委托。



