(function(){
	var menuItems = document.getElementById('rmenu').children;
	for(var i = menuItems.length-1; i >= 0; i--) {
		menuItems[i].onmousedown = function(event) {
			event = event || window.event;
			if (event.which == 1) {
				// if(event.stopPropagation){
				// 	event.stopPropagation(); // 阻止事件冒泡
				// } else {
				// 	event.cancelBubble = true; // 兼容ie
				// }
				alert(this.innerText);
				document.getElementById('rmenu').style.display = 'none';
			}
		}
	}
})();
// 鼠标在box框右键事件，显示右键菜单
document.getElementById('box').oncontextmenu = function(event){
	event = event || window.event;
	var menu = document.getElementById('rmenu');
	menu.style.display = 'block';
	var box = document.getElementById('box'),
		  mouseX = event.offsetX,   // 鼠标点击位置
		  mouseY = event.offsetY, 
		  menuH = menu.offsetHeight,  // 菜单的宽、高
		  menuW = menu.offsetWidth,
		  boxW = box.offsetWidth, // 显示菜单的框大小
		  boxH = box.offsetHeight,
		  menuL = mouseX,  // 菜单应显示的位置
		  menuT = mouseY;
	
	if(mouseX+menuW>boxW) { // 鼠标右边宽度不够就显示在左侧
		menuL = mouseX - menuW;
	}
	if(mouseY+menuH>boxH) { // 鼠标下方位置不够就显示在上侧
		menuT = mouseY - menuH;
	}
	menu.style.left = menuL+'px';
	menu.style.top = menuT+'px';
	
	return false;
}

// 点击其他区域时，菜单隐藏
document.onmousedown = function(){
	var menu = document.getElementById('rmenu');
	menu.style.display = 'none';
}
