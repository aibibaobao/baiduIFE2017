  numCount = 0; //数字的个数
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
    btns[5].onclick = bubbleSort;
  }

  // 冒泡排序
  function bubbleSort() {
    var displayDiv = document.getElementById('display-num'), numBlocks = displayDiv.childNodes, len = numBlocks.length;
    if(len <= 0) {
      return;
    }
    for (var i = len - 1; i >= 0; i--) {
      for (var j = 0; j < i; j++) {
        if (numBlocks[j].offsetHeight > numBlocks[j+1].offsetHeight) {
          var newNode = numBlocks[j+1].cloneNode(true);
          newNode.onclick = deleteNum;
          displayDiv.insertBefore(newNode, numBlocks[j]);
          numBlocks[j] = numBlocks[j+1];
          displayDiv.removeChild(numBlocks[j+1]);
        }
      }
    }
  }
  // 添加数字
  function addNum(event) {
    var val = document.getElementById('ipt-num').value;
    if(parseInt(val)<=100 && parseInt(val)>=10) { // ipt框有数字
      if (numCount >= 60) {
        alert('输入数字已有60个，不能再添加');
        return;
      }
      var newNum = document.createElement('DIV');  //新创建的节点
      newNum.setAttribute('class', 'num-block');
      newNum.style.height = (parseInt(val)*5)+'px';
      var numText = document.createTextNode(val);
      newNum.appendChild(numText);
      newNum.onclick = deleteNum;

      var displayDiv = document.getElementById('display-num');
      if(!displayDiv.hasChildNodes() || this.getAttribute('name')=='r-in'){ // 列表为空，左右两侧进都是一样效果
        displayDiv.appendChild(newNum);
      } else if(this.getAttribute('name') == 'l-in'){ // 已有数字时，从左侧进
        displayDiv.insertBefore(newNum, displayDiv.childNodes[0]);
      }
      numCount++;
      document.getElementById('ipt-num').value = ""; // ipt框清空
    } else {
      alert("输入无效，请输入10-100范围内数字");
      document.getElementById('ipt-num').focus();
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
      numCount--;
    }
  }

  // 点击数字后，删除数字
  function deleteNum(event) {
    this.parentNode.removeChild(this);
    numCount--;
  }

  // ipt框输入必须为数字，题设没有说明，所以排除了小数的情况
  function checkNum(event) {
    event = event || window.event;
    this.value = this.value.replace(/\D/g, '');
  }  
