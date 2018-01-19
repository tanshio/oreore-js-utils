/*! @preserve undefined v2.0.0 - tansio | MIT License */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.isTouch = factory());
}(this, (function () { 'use strict';

/**
 * Check Touch Device
 * @returns {boolean}
 */
function isTouch () {
  var ua = navigator.userAgent;
  return /Android|iPhone|iPod|iPad/.test(ua);
}

return isTouch;

})));
