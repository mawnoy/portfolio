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

  // remove useless witespace node in DOM. http://reference.sitepoint.com/javascript/Node/normalize
  function cleanWhitespace(node) {
    for (var i=0; i<node.childNodes.length; i++)
    {
      var child = node.childNodes[i];
      if(child.nodeType === 3 && !/\S/.test(child.nodeValue))
      {
        node.removeChild(child);
        i--;
      }
      if(child.nodeType === 1)
      {
        cleanWhitespace(child);
      }
    }
    return node;
  }



  // remove hover state for touch devices.
  // http://stackoverflow.com/questions/23885255/how-to-remove-ignore-hover-css-style-on-touch-devices
  // http://mir.aculo.us/2013/01/26/why-and-how-to-not-use-hover-styles-on-touch-devices/
  // var touch = window.ontouchstart ||
  //             navigator.MaxTouchPoints > 0 ||
  //             navigator.msMaxTouchPoints > 0;

  // if (touch) { // remove all :hover stylesheets
  //     try { // prevent crash on browsers not supporting DOM styleSheets properly
  //         for (var si in document.styleSheets) {
  //             var styleSheet = document.styleSheets[si];
  //             if (!styleSheet.rules) continue;

  //             for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
  //                 if (!styleSheet.rules[ri].selectorText) continue;

  //                 if (styleSheet.rules[ri].selectorText.match(':hover')) {
  //                     styleSheet.deleteRule(ri);
  //                 }
  //             }
  //         }
  //     } catch (ex) {}
  // }



  // Function Toggle botton add is-active class.
  // Ref - http://callmenick.com/post/animating-css-only-hamburger-menu-icons
  // http://callmenick.com/_development/css-hamburger-menu-icons/
  ((function() {

    function toggleHandler(toggle, dataTarget, dataToggle) {
      toggle.addEventListener( 'click', function(e) {
        e.preventDefault();

        var target = document.querySelector(dataTarget);

        var a = (this.classList.contains('is-active') === true) ? this.classList.remove('is-active') : this.classList.add('is-active');
        var b = (target.classList.contains(dataToggle) === true) ? target.classList.remove(dataToggle) : target.classList.add(dataToggle);
      });
    }


    var toggles = document.querySelectorAll('.btn-hamburger');

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
        var b = (topBtn.classList.contains('is-active') === true) ? topBtn.classList.remove('is-active') : false;

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

        var topWorkSec = document.querySelector('#work');

        // console.log(topWorkSec.offsetTop);
        // window.scrollTo(0, topWorkSec.offsetTop);

      });
    });

    var closeLists = document.querySelectorAll('.close');
    // console.log(closeLists);

    [].slice.call(closeLists).forEach(function(el, i) {
      el.addEventListener('click', function(e) {
        e.preventDefault();

        var target = document.querySelectorAll('.off-gallery');

        var a = (target[i].classList.contains('on') === true) ? target[i].classList.remove('on') : false;
      });
    });

  })());

  // Function toggle animation class when scroll
  // http://codyhouse.co/demo/vertical-timeline/index.html#0
  ((function() {

    var timeBlockLists = document.querySelectorAll('.time-block');
    
    var timeBlockNode = [].slice.call(timeBlockLists); 

    var findClass = function(parentNode, classNameArray) {

      var classNode = [];

      for(var i = 0; i < parentNode.childNodes.length; i++) {
        // console.log(parentNode.childNodes[i]);
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
            
            cleanWhitespace(elemClass);
            var a = (elemClass.childNodes[1] !== undefined) ? elemClass.childNodes[1].classList.add('fade-in') : false;
            
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
                setTimeout(window.scrollTo(0, frameTop), 100); // set timeout to fixed WindowScroll in mobile.

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