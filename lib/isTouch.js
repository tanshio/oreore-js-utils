/*! @preserve undefined v2.0.0 - tansio | MIT License */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.isTouch = {})));
}(this, (function (exports) { 'use strict';

/**
 * Check Touch Device
 * @returns {boolean}
 */
var isTouch = function () {
    var ua = navigator.userAgent;
    return (/Android|iPhone|iPod|iPad/.test(ua));
};

exports.isTouch = isTouch;

Object.defineProperty(exports, '__esModule', { value: true });

})));
