window.onload = function(){
	var imgList = document.getElementsByClassName('github');

	for(var i in imgList){
		imgList[i].addEventListener('click', apagar, false);
	}

	function apagar(){
		this.style.display = "none";
	}
}