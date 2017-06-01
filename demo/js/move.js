/**
 * Created by ZhuWQ on 2016/10/27.
 */

function getStyle(obj,name) {
    return (obj.currentStyle || getComputedStyle(obj,false))[name];
}

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
