/*! @preserve undefined v2.0.0 - tansio | MIT License */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.changeViewport = factory());
}(this, (function () { 'use strict';

/**
 * Check Mobile Device
 * @returns {boolean}
 */
function isMobile() {
  var ua = navigator.userAgent;
  return ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 || ua.indexOf('Windows Phone') > 0;
}

/**
 * [description]
 * @param  {Number} [size=1024] [description]
 */

function changeViewport(size) {
  if (size === void 0) {
    size = 1024;
  }

  var _viewport = document.createElement('meta');

  var $head = document.querySelector('head');

  _viewport.setAttribute('name', 'viewport');

  if (isMobile()) {
    _viewport.setAttribute('content', 'width=device-width, initial-scale=1');
  } else {
    _viewport.setAttribute('content', "width=" + size);
  }

  if ($head) {
    $head.appendChild(_viewport);
  }
}

return changeViewport;

})));
