/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 60);
/******/ })
/************************************************************************/
/******/ ({

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Check Mobile Device
 * @returns {boolean}
 */

exports.default = function () {
  var ua = navigator.userAgent;
  return ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 || ua.indexOf('Windows Phone') > 0;
};

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var isMobile_1 = __webpack_require__(42);
/**
 * [description]
 * @param  {Number} [size=1024] [description]
 */


exports.default = function () {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1024;

  var _viewport = document.createElement('meta');

  var $head = document.querySelector('head');

  _viewport.setAttribute('name', 'viewport');

  if (isMobile_1.default()) {
    _viewport.setAttribute('content', 'width=device-width, initial-scale=1');
  } else {
    _viewport.setAttribute('content', "width=".concat(size));
  }

  if ($head) {
    $head.appendChild(_viewport);
  }
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGNlMTA1ZDYyYWY4ZDgyNmU4ZjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2lzTW9iaWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9jaGFuZ2VWaWV3cG9ydC50cyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImRlZmF1bHQiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImluZGV4T2YiLCJpc01vYmlsZV8xIiwicmVxdWlyZSIsInNpemUiLCJfdmlld3BvcnQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCIkaGVhZCIsInF1ZXJ5U2VsZWN0b3IiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM3REE7O0FBQ0FBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLFNBQU87QUFBVCxDQUE3QztBQUNBOzs7OztBQUlBRCxRQUFRRSxPQUFSLEdBQWtCLFlBQU07QUFDcEIsTUFBTUMsS0FBS0MsVUFBVUMsU0FBckI7QUFDQSxTQUFRRixHQUFHRyxPQUFILENBQVcsUUFBWCxJQUF1QixDQUF2QixJQUE0QkgsR0FBR0csT0FBSCxDQUFXLE1BQVgsSUFBcUIsQ0FBakQsSUFBdURILEdBQUdHLE9BQUgsQ0FBVyxTQUFYLElBQXdCLENBQXpCLElBQWdDSCxHQUFHRyxPQUFILENBQVcsUUFBWCxJQUF1QixDQUE3RyxJQUFtSEgsR0FBR0csT0FBSCxDQUFXLGVBQVgsSUFBOEIsQ0FBeko7QUFDSCxDQUhELEM7Ozs7Ozs7O0FDTkE7O0FBQ0FSLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLFNBQU87QUFBVCxDQUE3Qzs7QUFDQSxJQUFNTSxhQUFhLG1CQUFBQyxDQUFRLEVBQVIsQ0FBbkI7QUFDQTs7Ozs7O0FBSUFSLFFBQVFFLE9BQVIsR0FBa0IsWUFBaUI7QUFBQSxNQUFoQk8sSUFBZ0IsdUVBQVQsSUFBUzs7QUFDL0IsTUFBTUMsWUFBWUMsU0FBU0MsYUFBVCxDQUF1QixNQUF2QixDQUFsQjs7QUFDQSxNQUFNQyxRQUFRRixTQUFTRyxhQUFULENBQXVCLE1BQXZCLENBQWQ7O0FBQ0FKLFlBQVVLLFlBQVYsQ0FBdUIsTUFBdkIsRUFBK0IsVUFBL0I7O0FBQ0EsTUFBSVIsV0FBV0wsT0FBWCxFQUFKLEVBQTBCO0FBQ3RCUSxjQUFVSyxZQUFWLENBQXVCLFNBQXZCLEVBQWtDLHFDQUFsQztBQUNILEdBRkQsTUFHSztBQUNETCxjQUFVSyxZQUFWLENBQXVCLFNBQXZCLGtCQUEyQ04sSUFBM0M7QUFDSDs7QUFDRCxNQUFJSSxLQUFKLEVBQVc7QUFDUEEsVUFBTUcsV0FBTixDQUFrQk4sU0FBbEI7QUFDSDtBQUNKLENBYkQsQyIsImZpbGUiOiJjaGFuZ2VWaWV3cG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0Y2UxMDVkNjJhZjhkODI2ZThmNCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBDaGVjayBNb2JpbGUgRGV2aWNlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0cy5kZWZhdWx0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICByZXR1cm4gKHVhLmluZGV4T2YoJ2lQaG9uZScpID4gMCB8fCB1YS5pbmRleE9mKCdpUG9kJykgPiAwIHx8ICh1YS5pbmRleE9mKCdBbmRyb2lkJykgPiAwKSAmJiAodWEuaW5kZXhPZignTW9iaWxlJykgPiAwKSB8fCB1YS5pbmRleE9mKCdXaW5kb3dzIFBob25lJykgPiAwKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaXNNb2JpbGUudHMiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGlzTW9iaWxlXzEgPSByZXF1aXJlKFwiLi9pc01vYmlsZVwiKTtcbi8qKlxuICogW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7TnVtYmVyfSBbc2l6ZT0xMDI0XSBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydHMuZGVmYXVsdCA9IChzaXplID0gMTAyNCkgPT4ge1xuICAgIGNvbnN0IF92aWV3cG9ydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21ldGEnKTtcbiAgICBjb25zdCAkaGVhZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKTtcbiAgICBfdmlld3BvcnQuc2V0QXR0cmlidXRlKCduYW1lJywgJ3ZpZXdwb3J0Jyk7XG4gICAgaWYgKGlzTW9iaWxlXzEuZGVmYXVsdCgpKSB7XG4gICAgICAgIF92aWV3cG9ydC5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnLCAnd2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIF92aWV3cG9ydC5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnLCBgd2lkdGg9JHtzaXplfWApO1xuICAgIH1cbiAgICBpZiAoJGhlYWQpIHtcbiAgICAgICAgJGhlYWQuYXBwZW5kQ2hpbGQoX3ZpZXdwb3J0KTtcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NoYW5nZVZpZXdwb3J0LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==