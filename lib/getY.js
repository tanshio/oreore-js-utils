/*! @preserve undefined v2.0.0 - tansio | MIT License */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.getY = {})));
}(this, (function (exports) { 'use strict';

function getY() {
  var y = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  return y;
}

exports.getY = getY;

Object.defineProperty(exports, '__esModule', { value: true });

})));
