/*! @preserve undefined v2.0.0 - tansio | MIT License */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.isTab = {})));
}(this, (function (exports) { 'use strict';

/**
 * Check Tablet Device
 * @returns {boolean}
 */
function isTab() {
  var ua = navigator.userAgent;
  return ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') === -1;
}

exports.isTab = isTab;

Object.defineProperty(exports, '__esModule', { value: true });

})));
