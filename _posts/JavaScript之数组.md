---
title: JavaScript之数组
tags:
  - JavaScript
  - 数组
date: 2016-10-21 21:28:23
categories: 前端
layout: post
description: JavaScript数组的基本方法简介。
---

## 数组

@(JavaScript)

------

[TOC]

### 数组元素的增删

```javascript
var array = [];
array[0] = 22;
array.push("sstd");  // 尾部追加
array[array.length]=521; // 尾部追加
array.unshift(5);  // 头部添加
console.log(array);
result：
[ 5, 22, 'sstd', 521 ]
```

### 数组元素的删除

```javascript
delete array[1];  // 删除其中一个元素,该值变为undefined,数组长度不变
console.log(array);  // [ 5, , 'sstd', 521 ]
console.log(array.length); // 4
array.length -= 1;  // 删除最后一个元素 
console.log(array);  // [ 5, , 'sstd' ]
console.log(array.length); // 3
array.pop();  // 尾部删除元素
console.log(array);  // [ 5,  ]
console.log(array.length); // 2
array.shift();  // 头部删除元素 
console.log(array); // [  ]
console.log(array.length); // 1
```

### 数组遍历

```javascript
var array = [[1, 2, 3], [4, 5, 6]];
for (var i = 0; i < array.length; i++)
    for (var j = 0; j < array[i].length; j++)
        console.log(array[i][j]);
        
var arr = [15, 2, 110, 78, 65, 100];
arr.forEach(function (x)
{
    console.log(x);
})
```

### 数组方法

#### 数组转字符串

```javascript
var arr = [1,2,3];

console.log(arr.join());
console.log(arr.join("-"));
function repeatString(str, n)
    {
            return new Array(n+1).join(str);
    }
console.log(repeatString("Hi",3));
result:
1,2,3
1-2-3
HiHiHi
```

#### 数组逆置

> 数组逆置会改变原数组顺序。

```javascript
var arr = [1,2,3];
arr.reverse();
console.log(arr);   //  [ 3, 2, 1 ]
```

#### 数组排序

> 数组排序会改变原数组顺序。

```javascript
var arr = [ 15, 110, 2, 'd', 'a', 'c' ]
arr.sort();
console.log(arr);  // [ 110, 15, 2, 'a', 'c', 'd' ]
arr.sort(function (a, b)
{
    return a-b;
});
console.log(arr);  // [ 2, 15, 110, 'a', 'c', 'd' ]
```

#### 数组截取

> 数组截取不会改变原数组。

```javascript
var arr = [15,2,110,78,65,100];
console.log(arr.slice(1));  // [ 2, 110, 78, 65, 100 ]
console.log(arr.slice(1,3));  //前闭后开 [ 2, 110 ]
console.log(arr.slice(1,-1)); // 去掉头尾 [ 2, 110, 78, 65 ]
console.log(arr); //原数组不变 [ 15, 2, 110, 78, 65, 100 ]
```

#### 数组拼接

> 数组拼接会改变原数组。

```javascript
var arr = [15,2,110,78,65,100];
console.log(arr.splice(2)); // [ 2, 110, 78, 65, 100 ]
console.log(arr);  // [ 15, 2 ]

var arr = [15,2,110,78,65,100]; 
console.log(arr.splice(1,3)); // 一个参数为位置，第二个为删除个数 结果为 [ 2, 110, 78 ]
console.log(arr);  // [ 15, 65, 100 ]
var arr = [15,2,110,78,65,100]; 
console.log(arr.splice(2,1,"a",55,"ss"));  // [ 110 ] 从删除的位置添加元素
console.log(arr);  // [ 15, 2, 'a', 55, 'ss', 78, 65, 100 ]
```

#### 数组映射

> 数组映射不会改变原数组。

```javascript
var arr = [15, 2, 110, 78, 65, 100];
console.log(arr.map(function (x)
{
    return x+100;
}));  // [ 115, 102, 210, 178, 165, 200 ]
console.log(arr);  // [ 15, 2, 110, 78, 65, 100 ]
```

#### 数组过滤

> 数组过滤不会改变原数组。

```javascript
var arr = [15, 2, 110, 78, 65, 100];
console.log(arr.filter(function (value,index)
{  // 筛选出索引为偶数或者值大于100的元素
    return index%2===1||value>100;
}));  // [ 2, 110, 78, 100 ]
console.log(arr);  // [ 15, 2, 110, 78, 65, 100 ]
```

#### 数组判断

```javascript
var arr = [1, 5, 7, 6, 3, 54, 55];
console.log(arr.every(function (value)
{  // 判断是否所有元素都大于10
    return value > 10;
})); // false

var arr = [1, 5, 7, 6, 3, 54, 55];
console.log(arr.some(function (value)
{  // 判断是否有元素大于0
    return value > 10;
}));  // true
```

#### reduce

> 每次的结果作为第一个参数。

```javascript
var arr = [1, 5, 7, 6, 3, 54, 55,4];
console.log(arr.reduce(function (value1,value2)
{  // 求最大值
    return value1>value2?value1:value2;
}));
console.log(arr);  // 55
```

#### 数组检索

```javascript
var arr = [1, 5, 7, 6, 3, 7,54, 55,4,7];
console.log(arr.indexOf(7))  // 从左向右查找   2
console.log(arr.indexOf(7,3));  // 第二个参数表示查找位置  5
console.log(arr.indexOf(7,-2)); // 从倒数第二个元素开始查找 9
console.log(arr.lastIndexOf(7)); //从右向左查找  9
console.log(arr.lastIndexOf(7,-2)); //从右向左查找  5
```

#### 数组判断

```javascript
var arr = [1, 5, 7, 6, 3, 7,54, 55,4,7];
console.log(Array.isArray(arr));  // true
console.log(arr instanceof  Array);  // true
console.log(arr.constructor === Array);  // true
```

