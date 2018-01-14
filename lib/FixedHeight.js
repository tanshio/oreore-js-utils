/*! @preserve undefined v2.0.0 - tansio | MIT License */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.FixedHeight = {})));
}(this, (function (exports) { 'use strict';

var FitHeight = /** @class */ (function () {
    /**
     * @constractor
     * @param {string} selector
     */
    function FitHeight(selector) {
        this.selector = selector;
        this.elements = Array.from(document.querySelectorAll(this.selector));
        this.eventListenerObject = this.changeHeight.bind(this);
    }
    FitHeight.prototype.init = function () {
        this.changeHeight();
        var ua = navigator.userAgent;
        if (/iPhone|iPod|iPad|Android/.test(ua)) {
            window.addEventListener('orientationchange', this.eventListenerObject);
        }
        else {
            window.addEventListener('resize', this.eventListenerObject);
        }
    };
    FitHeight.prototype.changeHeight = function () {
        var _this = this;
        this.elements.forEach(function (e) {
            var minusSelector = e.getAttribute('data-height-minus');
            var minusPx = 0;
            if (minusSelector) {
                minusPx = _this.getMinusPx(minusSelector);
            }
            e.style.height = window.innerHeight - minusPx + "px";
        });
    };
    FitHeight.prototype.remove = function () {
        console.log('remove');
        window.removeEventListener('resize', this.eventListenerObject);
    };
    /**
     * @param {string} selector
     * @returns {number}
     */
    FitHeight.prototype.getMinusPx = function (selector) {
        var minusPx = 0;
        var elem;
        elem = document.querySelector(selector);
        if (elem && elem.offsetHeight) {
            minusPx = elem.offsetHeight;
        }
        return minusPx;
    };
    return FitHeight;
}());

exports.FitHeight = FitHeight;

Object.defineProperty(exports, '__esModule', { value: true });

})));
