(function(){
	bindFocus();
	bindBlur();

	function bindBlur(){
		var inputs = document.getElementsByTagName('input'), i;
		for(i=inputs.length-2; i>=0; i--){
			inputs[i].onfocus = function(event){
				event = event || window.event;
				var id = this.getAttribute('id');
				var value = this.value;
				var flag, trueStr, falseStr;
				
				switch(id){
					case 'phone':
						flag = /^1[34578]\d{9}$/.test(value) ? true : false;
						trueStr = '手机号有效';
						falseStr = '手机号无效';
						break;
					case 'email':
						flag = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value) ? true : false;
						trueStr = '邮箱有效';
						falseStr = '邮箱无效';
						break;
					case 'repassword':
						flag = (value == document.getElementById('password').value ? true: false);
						trueStr = '输入密码一致';
						falseStr = '输入密码不一致';
						break;
					case 'password':
						flag = /^[a-zA-Z0-9]{6,18}$/.test(value);
						trueStr = '密码可用';
						falseStr = '密码不可用';
						break;
					case 'name':
						flag = /([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[a-zA-Z])+/.test(value);
						value.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+/, 'aa');
						flag = flag && (value.length>=4) && (value.length<=16);
						trueStr = '名称可用';
						falseStr = '名称不可用';
						break;
				}
				if (flag) {
					this.parentNode.className += ' green-tip';
					this.nextSibling.nextSibling.innerHTML = trueStr;
				} else {
					this.parentNode.className += ' red-tip';
					this.nextSibling.nextSibling.innerHTML = falseStr;
				}
			}
		}
	}
	// 去掉前后空格
	function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
	}
	function bindFocus(){
		var inputs = document.getElementsByTagName('input'), i;
		for(i=inputs.length-2; i>=0; i--){
			inputs[i].onfocus = function(event){
				event = event || window.event;
				var id = this.getAttribute('id');
				this.style.borderColor = '#999';
				switch(id){
					case 'phone':
						this.nextSibling.nextSibling.innerHTML = '11位有效手机号';
						break;
					case 'email':
						this.nextSibling.nextSibling.innerHTML = '有效邮箱';
						break;
					case 'repassword':
						this.nextSibling.nextSibling.innerHTML = '再次输入相同密码';
						break;
					case 'password':
						this.nextSibling.nextSibling.innerHTML = '输入密码, 6-18位英文或数字';
						break;
					case 'name':
						this.nextSibling.nextSibling.innerHTML = '必填，4-16位字符';
						break;
				}
			}
		}
	}
})();