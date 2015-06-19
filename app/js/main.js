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
// 

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Function Toggle botton
  // Ref - http://callmenick.com/post/animating-css-only-hamburger-menu-icons
  ((function() {

    function toggleHandler(toggle, dataTarget, dataToggle) {
      toggle.addEventListener( 'click', function(e) {
        e.preventDefault();

        var target = document.querySelector(dataTarget);

        var a = (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
        var b = (target.classList.contains(dataToggle) === true) ? target.classList.remove(dataToggle) : target.classList.add(dataToggle);
      });
    }

    var toggles = document.querySelectorAll('.toggle-btn');

    for (var i = toggles.length - 1; i >= 0; i--) {
      var toggle     = toggles[i];
      var dataToggle = toggle.getAttribute('data-toggle');
      var dataTarget = toggle.getAttribute('data-target');
      
      toggleHandler(toggle, dataTarget, dataToggle);
    }


    // // link handles for top nav
    var hrefNodes = document.querySelectorAll('a[href^="#"]');

    [].slice.call(hrefNodes).forEach(function(el, i) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        
        var topBtn = document.querySelector('#top-btn-toggle');
        var menu = document.querySelector('#menu-top');

        var a = (menu.classList.contains('on') === true) ? menu.classList.remove('on') : false;
        var b = (topBtn.classList.contains('active') === true) ? topBtn.classList.remove('active') : false;

      });
    });

  })());

  // Gallery control
  ((function() {

    var itemLists = document.querySelectorAll('.item');

    [].slice.call(itemLists).forEach(function(el, i) {
      el.addEventListener('click', function(e) {
        e.preventDefault();

        var offGallerys = document.querySelectorAll('.off-gallery');

        var a = (offGallerys[i].classList.contains('on') === true) ? offGallerys[i].classList.remove('on') : offGallerys[i].classList.add('on');

        // offGallerys[i].bou

      });
    });

    var closeLists = document.querySelectorAll('.close');
    console.log(closeLists);

    [].slice.call(closeLists).forEach(function(el, i) {
      el.addEventListener('click', function(e) {
        e.preventDefault();

        var target = document.querySelectorAll('.off-gallery');

        var a = (target[i].classList.contains('on') === true) ? target[i].classList.remove('on') : false;
      });
    });

  })());

  // Function animation bounce-in verticle time-line
  // http://codyhouse.co/demo/vertical-timeline/index.html#0
  ((function() {

    var timeBlockLists = document.querySelectorAll('.time-block');
    
    var timeBlockNode = [].slice.call(timeBlockLists); 

    var findClass = function(parentNode, classNameArray) {

      var classNode = [];

      for(var i = 0; i < parentNode.childNodes.length; i++) {
        if(classNameArray.indexOf(parentNode.childNodes[i].className) >= 0) {
          classNode.push(parentNode.childNodes[i]);
        }
      }
      return classNode;
    };

    timeBlockNode.forEach(function(el, i) {
      if(el.getBoundingClientRect().top > window.innerHeight * 0.75) {
        findClass(el,['circle-point', 'text-content']).forEach(function(elemClass) {
          elemClass.classList.add('is-hidden');
        });
      }
    });

    window.onscroll = function() {
      timeBlockNode.forEach(function(el, i) {
        if(el.getBoundingClientRect().top <= window.innerHeight * 0.75 && findClass(el, ['circle-point is-hidden']).length > 0) {
          findClass(el, ['circle-point is-hidden', 'text-content is-hidden']).forEach(function(elemClass) {
            elemClass.classList.remove('is-hidden');
            elemClass.classList.add('bounce-in');
          });
        }
      });
    };

  })());


  // smooth scroll function
  // https://coderwall.com/p/hujlhg/smooth-scrolling-without-jquery
  // http://www.kryogenix.org/code/browser/smoothscroll/smoothscroll.js
  
  ((function() {
    
    var smooth_scroll_to = function(element, target, duration) {
      target = Math.round(target);
      duration = Math.round(duration);

      if (duration < 0) {  
        return Promise.reject('bad duration');
      } 
      else if (duration === 0){
        element.offsetTop = target;
        return Promise.resolve();       
      }
      else {

        var start_time = Date.now();
        var end_time = start_time + duration;

        var start_top = 0;
        var distance = target - start_top;
        

        // based on http://en.wikipedia.org/wiki/Smoothstep
        var smooth_step = function(start, end, point) {
            if(point <= start) { return 0; }
            if(point >= end) { return 1; }
            var x = (point - start) / (end - start); // interpolation
            return x*x*(3 - 2*x);
        };

        return new Promise(function(resolve, reject) {
            // This is to keep track of where the element's scrollTop is
            // supposed to be, based on what we're doing
            var previous_top = element.offsetTop;

            // This is like a think function from a game loop
            var scroll_frame = function() {
                if(element.offsetTop !== previous_top) {
                    reject('interrupted');
                    return;
                }

                // set the scrollTop for this frame
                var now = Date.now();
                var point = smooth_step(start_time, end_time, now);
                var frameTop = Math.round(start_top + (distance * point));
                window.scrollTo(0, frameTop);
                // console.log(frameTop);

                // check if we're done!
                if(now >= end_time) {
                    resolve();
                    return;
                }

                // If we were supposed to scroll but didn't, then we
                // probably hit the limit, so consider it done; not
                // interrupted.
                if(element.scrollTop === previous_top && element.scrollTop !== frameTop) {

                    resolve();
                    return;
                }
                previous_top = element.offsetTop;

                // schedule next frame for execution
                setTimeout(scroll_frame, 0);
            };
            // boostrap the animation process
            setTimeout(scroll_frame, 0);
        });
      }
    };


    var hrefNodes = document.querySelectorAll('a[href^="#"]');

    [].slice.call(hrefNodes).forEach(function(el, i) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        
        var target = document.querySelector(el.getAttribute('href'));

        smooth_scroll_to(target, target.offsetTop, 600);

      });
    });

  })());

});