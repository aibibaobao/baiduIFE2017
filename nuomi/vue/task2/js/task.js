function Observer(data){
    this.data = data;
    this.change();
    this.eventCon = new Event(); //方式一
    // this.watcher = new Watch();
}
Observer.prototype.change =  function (){
  for(let prop in this.data){
    if(this.data.hasOwnProperty(prop)){
      value = this.data[prop];
      this.wrapper(prop, value);
      if (typeof value === "object") {
          new Observer(value);
      }
    }
  }
};
Observer.prototype.wrapper = function(prop, value){
  var observer = this;
  Object.defineProperty(this.data, prop, {   // 若this.data中已有prop属性，这个函数会将新定义的性质与其联系起来
    enumerable:true,
    configurable:true,
    set:function(newValue){
      console.log("你设置了 "+prop+", 新的值为 "+newValue);
      // 若绑定了event事件，则触发
      observer.eventCon.trigger(prop, value, newValue); // 方式一
      // observer.watcher.triggerEvent(prop); // 方式二
      if(typeof newValue === "object"){   // 若设置的新值是对象，也用observer包装
          new Observer(newValue);
      }
      value = newValue;
    },
    get:function(){
      console.log("你访问了 "+ prop);
      // let val = this[prop]; // 不能用this[prop]去访问属性，相当于又一次访问该属性，再一次调用get函数
      return value; //利用局部变量的闭包性质
    }
  });
    
};
/**
 * 方式一
 * 每个observer对象拥有一个Event对象，内部用一个events对象来保存该observer上注册的事件
 * 但存在一个问题，对于对象obj={a:1, b:2, c:{a:4}} obj中存在两个不同级的同名属性，若绑定其中一个a的事件，则访问任意一个都会触发a事件
 */

Observer.prototype.$watch = function(prop, callback){
  if(!this.data.hasOwnProperty(prop)){
    console.log("dose not contain property: "+prop);
    return; 
  }
  if(typeof callback !== "function"){
    console.log('callback is not function');
    return;
  }
  this.eventCon.on(prop,callback);
};

function Event(){
  this.events = {};
}
Event.prototype.trigger = function(type, ...args){
  if(this.events[type]){
    this.events[type].forEach(function(callback){
      callback(...args);
    });
  }
};
Event.prototype.on = function (type, callback) {
  if(this.events[type]){
    this.events[type].push(callback);
  } else {
    this.events[type] = [callback];
  }
};

/**
 * 方式二
 * 往dom上注册自定义事件、触发事件来模拟js对象的观察者模式
 */
/*
Observer.prototype.$watch = function (type, callback) {
  if(!this.data.hasOwnProperty(type)){
    console.log("dose not contain property: "+type);
    return; 
  }
  if(typeof callback !== "function"){
    console.log('callback is not function');
    return;
  }
  this.watcher.addEvent(type, callback);
}
function Watch() {
    this.init();
}
Watch.prototype.init = function () {
    this.eventConDom = document.getElementById('watch');
};
// 绑定监听
Watch.prototype.addEvent = function (type, callback) {
    if(this.eventConDom.addEventListener){
      this.eventConDom.addEventListener(type, callback, false);
    } else if(this.eventConDom.attachEvent){
      this.eventConDom.documentElement.fakeEvents = 0;
      this.eventConDom.attachEvent("onpropertychange", function(e){
        e = e || window.event;
        if(e.propertyName == type){
          callback.call(this.eventConDom);
        }
      });
    }
};
// 触发事件
Watch.prototype.triggerEvent = function(type){
  if(this.eventConDom.dispatchEvent) {// 一般浏览器
    // 自定义一个事件
    var e = document.createEvent('Event');
    e.initEvent(type, true, true);
    // 触发该事件
    this.eventConDom.dispatchEvent(e);
  } else {
    this.eventConDom.documentElement.fakeEvents++;
  }
};
*/
(function(){
    let app1 = new Observer({
      name: 'youngwind',
      age: 25,
      city:{a:"beijing", b:"chengdu"}
    });
    // 方式一
    
    app1.$watch('name', function (oldValue, newValue) {
       console.log('名字变了，原来是: '+ oldValue +'，现在是：' + newValue);
    })
    
    // 方式二
    /*
     *方式二有个缺点，因为就算每个Observer都有一个watch对象，当所有的watch对象都把事件监听绑定在同一个dom对象上，此时不同observer对象若有相同属性，
     *就相当于在dom上，注册了多个该属性名的回调函数
     *可以每个Observer都生成一个dom对象，但触发事件时，给回调函数传参也很不方便
     */
    /*
    app1.$watch('name', function () {
       console.log('名字变了 app1');
    })*/
    let app2 = new Observer({
      name: "app2",
      university: 'bupt',
      major: 'computer'
    });
    /*
    app2.$watch('name', function () {   
       console.log('名字变了 app2');
    })*/
})();

