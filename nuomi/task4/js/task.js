window.onload = function(){
	icon_addClick();
	var nodes = [ {name: "父节点1", children: [ {name: "子节点1"}, {name: "子节点2"} ]}, {name: "父节点2", children: [ {name: "子节点3"}, {name: "子节点4", children:[ {name:"子节点5"} ]} ]} ];
	var tree = new Tree(nodes);
	tree.init('tree');
};

function Tree(nodes){
	this.nodes = nodes;

}
Tree.prototype.init = function(domId){
	if (!this.nodes) {
		return;
	}
	var str = '<ul class="tree tree-open">'+createTree(this.nodes, 0)+'</ul>';
	document.getElementById(domId).innerHTML = str;
	icon_addClick();
}
function createTree(nodes, level){
	var str = '', flag = false;
	for(var i=0; i<nodes.length; i++){
		str += '<li>';
		flag = nodes[i].children && nodes[i].children.length>0;

		for(var j=0; j<level; j++){
			str += '<span class="indent"></span>'
		}
		if(flag){
			str += '<div class="icon-wrapper"><span class="icon open"></span></div>';
		} else {
			str += '<div class="icon-wrapper"></div>';
		}
		str += '<span class="node-name">'+nodes[i].name+'</span>';
		if(flag){
			str += '<ul class="tree tree-close">'+createTree(nodes[i].children, level+1)+'</ul>';
		}
		str +'</li>';
	}
	return str;
}
function icon_addClick(){
	var icons = document.getElementsByClassName('icon-wrapper');
	for(var i=icons.length-1; i>=0; i--){
		icons[i].onclick = function(event){
			event = event || window.event;
			var index = this.children[0].className.indexOf('open');
			if(index > 0){
				// 展开节点
				this.children[0].className = "icon";
				extentNode(this.parentNode);
			} else {
				// 收缩节点
				this.children[0].className = "icon open";
				var oul = this.parentNode.getElementsByTagName('ul');
				if(oul || oul.length>0){
					oul[0].style.display = "none";
				}
			}
		}
	}
}
function extentNode(parentNode){
	if(!parentNode || !parentNode.getElementsByTagName('ul')){
		return;
	} 
	var nodeElement = parentNode.getElementsByTagName('ul')[0];
	nodeElement.style.display = 'block';
}

