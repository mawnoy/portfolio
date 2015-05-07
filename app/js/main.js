'use strict';

// Function Pallarax scroll
// Ref - https://shifteleven.com/articles/2007/06/28/array-like-objects-in-javascript/

(function() {

	var parallax = document.querySelectorAll('.top-header'),
		speed = .5;

	window.onscroll = function() {
		
		// [].slice.call(parallax) > make obj to Array like obj to use with forEach.
		[].slice.call(parallax).forEach(function(el, i) {

			
			var windowOffset = window.pageYOffset,
				elBackgroundPos = "50%" + (windowOffset * speed) + "px";

			el.style.backgroundPosition = elBackgroundPos;
			// console.log(el.style.backgroundPosition);

		});
	};
	

})();
