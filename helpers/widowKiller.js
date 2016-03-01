function widowKiller (selector) {
	var elements = document.querySelectorAll(selector);
	Array.prototype.forEach.call(elements, function(el, i){
		var wordArray = el.textContent.split(" ");
		if (wordArray.length > 1) {
			wordArray[wordArray.length-2] += "&nbsp;" + wordArray[wordArray.length-1];
			wordArray.pop();
			el.innerHTML = wordArray.join(" ")
		}
	});
}
