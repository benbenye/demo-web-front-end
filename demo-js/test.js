// Q1: 测试构造函数中this指针的问题
function Foo() {
}

Foo.prototype._init = function () {
  this.qq = 'bby';
}
Foo.prototype.bar = function () {
  alert('Foo.qq:'+Foo.qq);
  alert('Foo.prototype.qq:'+Foo.prototype.qq);
}

var obj = new Foo();
obj._init();
obj.bar();

alert('obj.qq:'+obj.qq);

// Q2: 测试 new 构造函数中this指针的问题
function Foo() {
  this._init();
}

Foo.prototype._init = function () {
  this.qq = 'bby';
}
Foo.prototype.bar = function () {
  alert('Foo.qq:'+Foo.qq);
}

var obj = new Foo();
obj.bar();

alert('obj.qq:'+obj.qq);

