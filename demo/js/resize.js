;(function(){
	var doc = document.documentElement;
	function resize(){
		doc.style.fontSize = doc.clientWidth/320*100 + 'px';
	}

	window.addEventListener('resize',resize,false)

	resize();
})();
