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



	/* PARTICLES.JS ANIMATION */
	particlesJS.load('particles-js', 'js/particles.json', function() {
		console.log('callback - particles.js config loaded');
	});



})();