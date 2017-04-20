/**
 * @param {[type]} obj [description]
 * el selector只支持根据id #idname, class .classname, tag tagname三种方式
 */
function Vue(obj){
  this.doms = this.findDoms(obj.el);
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
Vue.prototype.initDoms = function(data){
  if(this.doms.length <= 0){
    return;
  }
  for (var i = this.doms.length - 1; i >= 0; i--) {
    let dom = this.doms[i], str = dom.innerHTML, newStr = []; //获取每个dom,并处理中间的{{}}
    while(str){
      let from = str.indexOf("{{"), to = str.indexOf('}}');
      if(from>=0 && to>=0){
        var val = (new Function('with('+JSON.stringify(this.data)+'){var val = '+str.slice(from+2, to)+';}return val;'))(); // 用with传入this.data这样页面的user.name才能找到
        str = str.replace(str.slice(from, to+2), val); // 直接替换了页面的代码，并没有备份，后面数据更改怎么映射到页面？？？
      } else {
        break;
      }
    }
    dom.innerHTML = str;
  }
}
window.onload = function(){
  let app = new Vue({
    el: '#app',
    data: {
      user: {
        name: 'youngwind',
        age: 25
      }
    }
  });
}();

