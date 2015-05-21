// // Function Pallarax scroll
// // Ref - https://shifteleven.com/articles/2007/06/28/array-like-objects-in-javascript/

// (function() {

// 	'use strict';

// 	var parallax = document.querySelectorAll('.parallax'),
// 		speed = .5;

// 	window.onscroll = function() {
		
// 		// [].slice.call(parallax) > make obj to Array like obj to use with forEach.
// 		[].slice.call(parallax).forEach(function(el, i) {

			
// 			var windowOffset = window.pageYOffset,
// 				elBackgroundPos = "50%" + (windowOffset * speed) + "px";

// 			el.style.backgroundPosition = elBackgroundPos;
// 			// console.log(el.style.backgroundPosition);

// 		});
// 	};
	

// })();

// Function Toggle botton
// Ref - http://callmenick.com/post/animating-css-only-hamburger-menu-icons

(function() {

  'use strict';

  var toggles = document.querySelectorAll('.toggle-btn');

  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    var dataToggle = toggle.getAttribute('data-toggle');
    var dataTarget = toggle.getAttribute('data-target');
    
    toggleHandler(toggle, dataTarget, dataToggle);
  };

  function toggleHandler(toggle, dataTarget, dataToggle) {
    toggle.addEventListener( 'click', function(e) {
      e.preventDefault();

      var target = document.querySelector(dataTarget);

      (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
      (target.classList.contains(dataToggle) === true) ? target.classList.remove(dataToggle) : target.classList.add(dataToggle);
    });
  }

})();
