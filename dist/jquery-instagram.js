module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 50);
/******/ })
/************************************************************************/
/******/ ({

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.instagram = function () {
  var $list = $('.js-insta');
  var token = $list.data('token');

  var createList = function createList(post) {
    var block = "\n    <li class=\"m-insta__item\">\n      <a href=\"".concat(post.link, "\" target=\"_blank\" style=\"background-image: url(").concat(post.images.standard_resolution.url, ")\"></a>\n    </li>\n    ");
    $list.append(block);
  };

  $(function () {
    var count = 10;
    $.ajax({
      url: "https://api.instagram.com/v1/users/self/media/recent?access_token=".concat(token, "&amp;count=").concat(count),
      dataType: 'jsonp'
    }).done(function (evt) {
      console.log(evt);
      var post = evt.data;
      if (!post) return;

      for (var i = 0; i < post.length; i++) {
        createList(post[i]);
      }
    });
  });
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(51)))

/***/ }),

/***/ 51:
/***/ (function(module, exports) {

module.exports = require("jQuery");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjA5OTQzMmQ5ZjFiYzVjYTlmYjMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pxdWVyeS1pbnN0YWdyYW0udHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJpbnN0YWdyYW0iLCIkbGlzdCIsIiQiLCJ0b2tlbiIsImRhdGEiLCJjcmVhdGVMaXN0IiwicG9zdCIsImJsb2NrIiwibGluayIsImltYWdlcyIsInN0YW5kYXJkX3Jlc29sdXRpb24iLCJ1cmwiLCJhcHBlbmQiLCJjb3VudCIsImFqYXgiLCJkYXRhVHlwZSIsImRvbmUiLCJldnQiLCJjb25zb2xlIiwibG9nIiwiaSIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O3lDQzdEQTs7QUFDQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFBRUMsU0FBTztBQUFULENBQTdDOztBQUNBRCxRQUFRRSxTQUFSLEdBQW9CLFlBQU07QUFDdEIsTUFBTUMsUUFBUUMsRUFBRSxXQUFGLENBQWQ7QUFDQSxNQUFJQyxRQUFRRixNQUFNRyxJQUFOLENBQVcsT0FBWCxDQUFaOztBQUNBLE1BQU1DLGFBQWEsU0FBYkEsVUFBYSxDQUFDQyxJQUFELEVBQVU7QUFDekIsUUFBTUMsc0VBRUdELEtBQUtFLElBRlIsZ0VBRThERixLQUFLRyxNQUFMLENBQVlDLG1CQUFaLENBQWdDQyxHQUY5Riw4QkFBTjtBQUtBVixVQUFNVyxNQUFOLENBQWFMLEtBQWI7QUFDSCxHQVBEOztBQVFBTCxJQUFFLFlBQVk7QUFDVixRQUFNVyxRQUFRLEVBQWQ7QUFDQVgsTUFBRVksSUFBRixDQUFPO0FBQ0hILHVGQUEwRVIsS0FBMUUsd0JBQTZGVSxLQUE3RixDQURHO0FBRUhFLGdCQUFVO0FBRlAsS0FBUCxFQUdHQyxJQUhILENBR1EsVUFBVUMsR0FBVixFQUFlO0FBQ25CQyxjQUFRQyxHQUFSLENBQVlGLEdBQVo7QUFDQSxVQUFNWCxPQUFPVyxJQUFJYixJQUFqQjtBQUNBLFVBQUksQ0FBQ0UsSUFBTCxFQUNJOztBQUNKLFdBQUssSUFBSWMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJZCxLQUFLZSxNQUF6QixFQUFpQ0QsR0FBakMsRUFBc0M7QUFDbENmLG1CQUFXQyxLQUFLYyxDQUFMLENBQVg7QUFDSDtBQUNKLEtBWEQ7QUFZSCxHQWREO0FBZUgsQ0ExQkQsQzs7Ozs7Ozs7QUNGQSxtQyIsImZpbGUiOiJqcXVlcnktaW5zdGFncmFtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNTApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGYwOTk0MzJkOWYxYmM1Y2E5ZmIzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluc3RhZ3JhbSA9ICgpID0+IHtcbiAgICBjb25zdCAkbGlzdCA9ICQoJy5qcy1pbnN0YScpO1xuICAgIGxldCB0b2tlbiA9ICRsaXN0LmRhdGEoJ3Rva2VuJyk7XG4gICAgY29uc3QgY3JlYXRlTGlzdCA9IChwb3N0KSA9PiB7XG4gICAgICAgIGNvbnN0IGJsb2NrID0gYFxuICAgIDxsaSBjbGFzcz1cIm0taW5zdGFfX2l0ZW1cIj5cbiAgICAgIDxhIGhyZWY9XCIke3Bvc3QubGlua31cIiB0YXJnZXQ9XCJfYmxhbmtcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgke3Bvc3QuaW1hZ2VzLnN0YW5kYXJkX3Jlc29sdXRpb24udXJsfSlcIj48L2E+XG4gICAgPC9saT5cbiAgICBgO1xuICAgICAgICAkbGlzdC5hcHBlbmQoYmxvY2spO1xuICAgIH07XG4gICAgJChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGNvdW50ID0gMTA7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGBodHRwczovL2FwaS5pbnN0YWdyYW0uY29tL3YxL3VzZXJzL3NlbGYvbWVkaWEvcmVjZW50P2FjY2Vzc190b2tlbj0ke3Rva2VufSZhbXA7Y291bnQ9JHtjb3VudH1gLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29ucCdcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldnQpO1xuICAgICAgICAgICAgY29uc3QgcG9zdCA9IGV2dC5kYXRhO1xuICAgICAgICAgICAgaWYgKCFwb3N0KVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNyZWF0ZUxpc3QocG9zdFtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcXVlcnktaW5zdGFncmFtLnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwialF1ZXJ5XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwialF1ZXJ5XCJcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCA1Il0sInNvdXJjZVJvb3QiOiIifQ==