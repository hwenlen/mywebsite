//getByClass
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		var aEle = oParent.getElementsByTagName('*');
		var arr = [];
		for(var i=0; i<aEle.length; i++){
			var re = new RegExp('\\b'+sClass+'\\b');
			if(re.test(aEle[i].className)){
				arr.push(aEle[i]);
			}
			return arr;
		}
	}
}

//绝对距离
function getPos(obj){
		var l = 0;
		var t = 0;
		while(obj){
			l+=obj.offsetLeft;
			t+=obj.offsetTop;
			obj = obj.offsetParent;
		}
		return {left:l,top:t}
	}

//随机
function rnd(n,m) {
	return parseInt(Math.random()*(m-n)+n);
}

//补零
function toDou(num){
	return num<10? '0'+num: ''+num;
}

//获取非行间样式
function getStyle(obj,name) {
    return (obj.currentStyle || getComputedStyle(obj,false))[name];
}

//move
function move(obj,json,options) {
    options = options || {};
    options.duration = options.duration || 1000;
    options.easing = options.easing || 'ease-out';
    // 先关后开
    clearInterval(obj.timer);
    var count = Math.floor(options.duration/30); // 总次数
    var start = {}; // 起点
    var dis = {}; // 终点

    for (var name in json) {
        start[name] = parseFloat(getStyle(obj,name));
        dis[name] = json[name] - start[name];
    }

    var n = 0;
    obj.timer = setInterval(function(){
        n++;

        for (var name in json) {
            switch(options.easing) {
                case 'linear':
                    var a = n / count;
                    var cur = start[name] + dis[name]*a;
                    break;
                case 'ease-in':
                    var a = n / count;
                    var cur = start[name] + dis[name] * Math.pow(a,3);
                    break;
                case 'ease-out':
                    var a = 1 - n/count;
                    var cur = start[name] + dis[name]*(1-Math.pow(a,3));
                    break;
            }
            if (name == 'opacity') {
                obj.style.opacity = cur;
                obj.style.filter = 'alpha(opacity:'+cur*100+')';
            } else {
                obj.style[name] = cur + 'px';
            }
        }

        if (n == count) {
            clearInterval(obj.timer);
            // 回调函数
            options.complete && options.complete();
        }
    },30);
}



