(function() {
	
	

	/* PREVEND DEFAULT */
	var blankLinks = document.querySelectorAll('a[href="#"]');
	blankLinks.forEach(function(el) {
		el.addEventListener('click', function(e) {
			e.preventDefault();
		});
	});



	/* PROGRESSBAR ANIMATION */
	var progress = document.querySelectorAll('.progress .progress-bar');
	document.addEventListener('DOMContentLoaded', function() {
		progress.forEach(function(el) {
			el.style.width = el.dataset.width + '%';
		});
	});



})();
//# sourceMappingURL=scripts.js.map
