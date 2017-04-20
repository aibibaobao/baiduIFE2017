function Observer(data, parentStr, originEvent){
    this.data = data;
    this.eventCon = originEvent ? originEvent : new Event(data);   // 一个根Observer对象共享一个Event对象
    this.change(parentStr);
}
Observer.prototype.change =  function (parentStr){
  for(let prop in this.data){
    if(this.data.hasOwnProperty(prop)){
      value = this.data[prop];
      this.wrapper(prop, value, parentStr);
      if (typeof value === "object") {
          new Observer(value, parentStr?parentStr+"."+prop:prop, this.eventCon);
      }
    }
  }
};
Observer.prototype.wrapper = function(prop, value, parentStr){
  var observer = this;
    Object.defineProperty(this.data, prop, {   // 若this.data中已有prop属性，这个函数会将新定义的性质与其联系起来
        enumerable:true,
        configurable:true,
        set:function(newValue){
            // console.log("你设置了 "+prop+", 新的值为 "+newValue);
            // 若绑定了event事件，则触发
            if(typeof newValue === "object"){   // 若设置的新值是对象，也用observer包装
                new Observer(newValue, parentStr?parentStr+"."+prop:prop, observer.eventCon);
            }
            value = newValue;
            observer.eventCon.trigger(parentStr?parentStr+"."+prop:prop, newValue); 
        },
        get:function(){
            // console.log("你访问了 "+ prop);
            return value; //利用局部变量的闭包性质
        }
    });
    
};
/**
 * 监测对象属性
 * @param  {[type]} prop [description]
 * @param  {[type]} dom  [description]
 * @return {[type]}      [description]
 */
Observer.prototype.$watch = function(prop, dom){
  this.eventCon.on(prop,dom);
};

function Event(data){
  this.data = data;
  this.events = {};   // events对象中的元素改一下type:[dom]数组中存放与type相关的dom，
}
/**
 * 对象属性发生变化，则触发dom更改
 * @param  {[type]} type     [description]
 * @param  {[type]} newValue [description]
 * @return {[type]}          [description]
 */
Event.prototype.trigger = function(type, newValue){
  var data = this.data;
  if(this.events[type]){
    this.events[type].forEach(function(dom){
      let str = dom.domOldHtml; //获取每个dom,并处理中间的{{}}
      while(str){
        let from = str.indexOf("{{"), to = str.indexOf('}}');
        if(from>=0 && to>=0){
          with(data){
            let val;
            eval("val = "+str.slice(from+2, to)); //本想用new Function来代替eval，但不知道为啥在这new Function始终没有值，不确定是否在回调函数中，new Function()无效
            str = str.replace(str.slice(from, to+2), val);
          }
        } else {
          break;
        }
      }
      dom.innerHTML = str;
    });
  }
};
/**
 * 绑定对象属性和dom
 * @param  {[type]} type [description]
 * @param  {[type]} dom  [description]
 * @return {[type]}      [description]
 */
Event.prototype.on = function (type, dom) {
  if(this.events[type]){
    this.events[type].push(dom);
  } else {
    this.events[type] = [dom];
  }
};

/**
 * @param {[type]} obj [description]
 * el selector只支持根据id #idname, class .classname, tag tagname三种方式
 */
function Vue(obj){
  this.doms = this.findDoms(obj.el);  
  this.observer = new Observer(obj.data,"");
  this.data = obj.data;
  this.initDoms(obj.data);
}
/**
 * 查找与el selector相关的dom对象
 * @param  {[type]} el [description]
 * @return {[type]}    [description]
 */
Vue.prototype.findDoms = function(el){
  var doms = [];
  if(/^#/.test(el)){
    doms.push(document.getElementById(el.slice(1)));
  } else if(/^\./.test(el)){
    doms = document.getElementsByClassName(el.slice(1));
  } else {
    doms = document.getElementsByTagName(el);
  }
  return doms;
};
/**
 * 更改初始设置的{{}}换算成实际值
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
Vue.prototype.initDoms = function(data){
  if(this.doms.length <= 0){
    return;
  }
  for (var i = this.doms.length - 1; i >= 0; i--) {
    let dom = this.doms[i], str = dom.innerHTML, newStr = []; //获取每个dom,并处理中间的{{}}
    dom.domOldHtml = str;
    while(str){
      let from = str.indexOf("{{"), to = str.indexOf('}}');
      if(from>=0 && to>=0){
        this.observer.$watch(str.slice(from+2, to),dom); // 若当前dom有涉及到某个对象属性，就把当前dom添加到对象属性的通知列表里
        var val = (new Function('with('+JSON.stringify(this.data)+'){var val = '+str.slice(from+2, to)+';}return val;'))(); // 用with传入this.data这样页面的user.name才能找到
        str = str.replace(str.slice(from, to+2), val);
      } else {
        break;
      }
    }
    dom.innerHTML = str;
  }
};

window.onload = function(){
  let app = new Vue({
    el: '#app',
    data: {
      user: {
        name: 'youngwind',
        age: 25
      },
      school: 'bupt',
      major: 'computer'
    }
  });
}();

