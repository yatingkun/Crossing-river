
前端纳米学位街机游戏克隆项目
===============================

学生应该用这个[评审标准](https://review.udacity.com/#!/rubrics/499/view))来自我检查自己提交的代码。 确认自己写的函数要是**面向对象的** -  要么是类函数（就像函数 Player 和 Enemy）要么是类的原型链上的函数比如 Enemy.prototype.checkCollisions ， 在类函数里面或者类的原型链函数里面适当的使用关键词 'this' 来引用调用该函数的对象实例。最后保证你的**readme.md**文件要写明关于如何运行和如何玩你的街机游戏的指引。

关于如何开始这个项目的更详细的指导，可以查阅这份[指南](https://gdgdocs.org/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true)。

## 街机游戏
我不知道为什么叫街机游戏，只知道该将可爱的卡通人移动到河对面就成功了！

## 玩法
下载下来，在浏览器中打开index.html就可以玩了

## 游戏设置
若要自定义小虫子速度，你得按照如下方法：
- 打开js文件夹下的 `app_update.js`，找到如下代码：
	```javascript
	var MAX_SPEED = 200;   //这里是设置第三行（从下往上数）小虫子的速度。
	var MIDDLE_SPEED = 150; //这里是设置第二行小虫子的速度。
	var MIN_SPEED = 50; //这里是设置第一行小虫子的速度。
	```

