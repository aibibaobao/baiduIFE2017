function Observer(data){
    this.data = data;
    this.change();
    this.eventCon = new Event(); //方式一
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
            if(typeof newValue === "object"){   // 若设置的新值是对象，也用observer包装
                new Observer(newValue);
            }
            value = newValue;
        },
        get:function(){
            console.log("你访问了 "+ prop);
            return value; //利用局部变量的闭包性质
        }
    });
    
};
/**
 * 方式一
 * 每个observer对象拥有一个Event对象，内部用一个events对象来保存该observer上注册的事件
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
  // 查其父属性
};
Event.prototype.on = function (type, callback) {
  if(this.events[type]){
    this.events[type].push(callback);
  } else {
    this.events[type] = [callback];
  }
};


(function(){
    let app1 = new Observer({
      name: {
        firstName: 'shaofeng',
        lastName: 'liang'
      },
      age: 25,
      city:{a:"beijing", b:"chengdu"}
    });
    // 方式一
    
    app1.$watch('name', function () {
       console.log('名字变了，原来是: '+ oldValue +'，现在是：' + newValue);
    })
})();

