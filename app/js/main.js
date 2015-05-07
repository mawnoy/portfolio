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

// Function Toggle botton
// Ref - http://callmenick.com/post/animating-css-only-hamburger-menu-icons

(function() {

  'use strict';

  var toggles = document.querySelectorAll('.toggle-btn');

  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  };

  function toggleHandler(toggle) {
    toggle.addEventListener( 'click', function(e) {
      e.preventDefault();
      (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
    });
  }

})();
