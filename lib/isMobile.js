/*! @preserve undefined v2.0.0 - tansio | MIT License */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.isMobile = {})));
}(this, (function (exports) { 'use strict';

/**
 * Check Mobile Device
 * @returns {boolean}
 */
var isMobile = function () {
    var ua = navigator.userAgent;
    return (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0) && (ua.indexOf('Mobile') > 0) || ua.indexOf('Windows Phone') > 0);
};

exports.isMobile = isMobile;

Object.defineProperty(exports, '__esModule', { value: true });

})));
