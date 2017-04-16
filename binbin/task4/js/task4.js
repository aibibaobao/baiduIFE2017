
  (function() {
    document.getElementById('ipt-num').onkeyup = checkNum;
    document.getElementById('ipt-num').onpaste = checkNum;
    btnClick();
  })();

  // 四个按钮绑定点击事件
  function btnClick() {
    var btns = document.getElementsByTagName('input');
    btns[1].onclick = addNum; 
    btns[2].onclick = addNum;
    btns[3].onclick = delNum;
    btns[4].onclick = delNum;
  }

  // 添加数字
  function addNum(event) {
    var val = document.getElementById('ipt-num').value;
    if(val || parseInt(val) === 0) { // ipt框有数字
      var newNum = document.createElement('DIV');  //新创建的节点
      newNum.setAttribute('class', 'num-block');
      var numText = document.createTextNode(val);
      newNum.appendChild(numText);
      newNum.onclick = deleteNum;

      var displayDiv = document.getElementById('display-num');
      if(!displayDiv.hasChildNodes() || this.getAttribute('name')=='r-in'){ // 列表为空，左右两侧进都是一样效果
        displayDiv.appendChild(newNum);
      } else if(this.getAttribute('name') == 'l-in'){ // 已有数字时，从左侧进
        displayDiv.insertBefore(newNum, displayDiv.childNodes[0]);
      }
      document.getElementById('ipt-num').value = ""; // ipt框清空
    }
  }

  // 按钮左侧出和右侧出
  function delNum() {
    var displayDiv = document.getElementById('display-num');
    if (displayDiv.hasChildNodes()) {
      if (this.getAttribute('name') == 'l-out') { //左侧出
        displayDiv.removeChild(displayDiv.firstChild);
      } else { // 右侧出
        displayDiv.removeChild(displayDiv.lastChild);
      }
    }
  }

  // 点击数字后，删除数字
  function deleteNum(event) {
    this.parentNode.removeChild(this);
  }

  // ipt框输入必须为数字，题设没有说明，所以排除了小数的情况
  function checkNum(event) {
    event = event || window.event;
    this.value = this.value.replace(/\D/g, '');
  }  
