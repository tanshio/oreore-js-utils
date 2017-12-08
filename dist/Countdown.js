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
/******/ 	return __webpack_require__(__webpack_require__.s = 89);
/******/ })
/************************************************************************/
/******/ ({

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

var isDate = __webpack_require__(91)

var MILLISECONDS_IN_HOUR = 3600000
var MILLISECONDS_IN_MINUTE = 60000
var DEFAULT_ADDITIONAL_DIGITS = 2

var parseTokenDateTimeDelimeter = /[T ]/
var parseTokenPlainTime = /:/

// year tokens
var parseTokenYY = /^(\d{2})$/
var parseTokensYYY = [
  /^([+-]\d{2})$/, // 0 additional digits
  /^([+-]\d{3})$/, // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
]

var parseTokenYYYY = /^(\d{4})/
var parseTokensYYYYY = [
  /^([+-]\d{4})/, // 0 additional digits
  /^([+-]\d{5})/, // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
]

// date tokens
var parseTokenMM = /^-(\d{2})$/
var parseTokenDDD = /^-?(\d{3})$/
var parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/
var parseTokenWww = /^-?W(\d{2})$/
var parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/

// time tokens
var parseTokenHH = /^(\d{2}([.,]\d*)?)$/
var parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/
var parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/

// timezone tokens
var parseTokenTimezone = /([Z+-].*)$/
var parseTokenTimezoneZ = /^(Z)$/
var parseTokenTimezoneHH = /^([+-])(\d{2})$/
var parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/

/**
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If all above fails, the function passes the given argument to Date constructor.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {Object} [options] - the object with options
 * @param {0 | 1 | 2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = parse('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Parse string '+02014101',
 * // if the additional number of digits in the extended year format is 1:
 * var result = parse('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
function parse (argument, dirtyOptions) {
  if (isDate(argument)) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime())
  } else if (typeof argument !== 'string') {
    return new Date(argument)
  }

  var options = dirtyOptions || {}
  var additionalDigits = options.additionalDigits
  if (additionalDigits == null) {
    additionalDigits = DEFAULT_ADDITIONAL_DIGITS
  } else {
    additionalDigits = Number(additionalDigits)
  }

  var dateStrings = splitDateString(argument)

  var parseYearResult = parseYear(dateStrings.date, additionalDigits)
  var year = parseYearResult.year
  var restDateString = parseYearResult.restDateString

  var date = parseDate(restDateString, year)

  if (date) {
    var timestamp = date.getTime()
    var time = 0
    var offset

    if (dateStrings.time) {
      time = parseTime(dateStrings.time)
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone)
    } else {
      // get offset accurate to hour in timezones that change offset
      offset = new Date(timestamp + time).getTimezoneOffset()
      offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset()
    }

    return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE)
  } else {
    return new Date(argument)
  }
}

function splitDateString (dateString) {
  var dateStrings = {}
  var array = dateString.split(parseTokenDateTimeDelimeter)
  var timeString

  if (parseTokenPlainTime.test(array[0])) {
    dateStrings.date = null
    timeString = array[0]
  } else {
    dateStrings.date = array[0]
    timeString = array[1]
  }

  if (timeString) {
    var token = parseTokenTimezone.exec(timeString)
    if (token) {
      dateStrings.time = timeString.replace(token[1], '')
      dateStrings.timezone = token[1]
    } else {
      dateStrings.time = timeString
    }
  }

  return dateStrings
}

function parseYear (dateString, additionalDigits) {
  var parseTokenYYY = parseTokensYYY[additionalDigits]
  var parseTokenYYYYY = parseTokensYYYYY[additionalDigits]

  var token

  // YYYY or ±YYYYY
  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString)
  if (token) {
    var yearString = token[1]
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    }
  }

  // YY or ±YYY
  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString)
  if (token) {
    var centuryString = token[1]
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    }
  }

  // Invalid ISO-formatted year
  return {
    year: null
  }
}

function parseDate (dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null
  }

  var token
  var date
  var month
  var week

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0)
    date.setUTCFullYear(year)
    return date
  }

  // YYYY-MM
  token = parseTokenMM.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    date.setUTCFullYear(year, month)
    return date
  }

  // YYYY-DDD or YYYYDDD
  token = parseTokenDDD.exec(dateString)
  if (token) {
    date = new Date(0)
    var dayOfYear = parseInt(token[1], 10)
    date.setUTCFullYear(year, 0, dayOfYear)
    return date
  }

  // YYYY-MM-DD or YYYYMMDD
  token = parseTokenMMDD.exec(dateString)
  if (token) {
    date = new Date(0)
    month = parseInt(token[1], 10) - 1
    var day = parseInt(token[2], 10)
    date.setUTCFullYear(year, month, day)
    return date
  }

  // YYYY-Www or YYYYWww
  token = parseTokenWww.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    return dayOfISOYear(year, week)
  }

  // YYYY-Www-D or YYYYWwwD
  token = parseTokenWwwD.exec(dateString)
  if (token) {
    week = parseInt(token[1], 10) - 1
    var dayOfWeek = parseInt(token[2], 10) - 1
    return dayOfISOYear(year, week, dayOfWeek)
  }

  // Invalid ISO-formatted date
  return null
}

function parseTime (timeString) {
  var token
  var hours
  var minutes

  // hh
  token = parseTokenHH.exec(timeString)
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR
  }

  // hh:mm or hhmm
  token = parseTokenHHMM.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseFloat(token[2].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE
  }

  // hh:mm:ss or hhmmss
  token = parseTokenHHMMSS.exec(timeString)
  if (token) {
    hours = parseInt(token[1], 10)
    minutes = parseInt(token[2], 10)
    var seconds = parseFloat(token[3].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE +
      seconds * 1000
  }

  // Invalid ISO-formatted time
  return null
}

function parseTimezone (timezoneString) {
  var token
  var absoluteOffset

  // Z
  token = parseTokenTimezoneZ.exec(timezoneString)
  if (token) {
    return 0
  }

  // ±hh
  token = parseTokenTimezoneHH.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  // ±hh:mm or ±hhmm
  token = parseTokenTimezoneHHMM.exec(timezoneString)
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10)
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  return 0
}

function dayOfISOYear (isoYear, week, day) {
  week = week || 0
  day = day || 0
  var date = new Date(0)
  date.setUTCFullYear(isoYear, 0, 4)
  var fourthOfJanuaryDay = date.getUTCDay() || 7
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay
  date.setUTCDate(date.getUTCDate() + diff)
  return date
}

module.exports = parse


/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var differenceInMonths = __webpack_require__(90);

var Countdown =
/*#__PURE__*/
function () {
  /**
   * constructor
   * @param {Date} startDate
   * @param {Date} endDate
   */
  function Countdown() {
    var startDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();
    var endDate = arguments[1];

    _classCallCheck(this, Countdown);

    this.DAY = 24 * 60 * 60 * 1000;
    this.startDate = startDate;
    this.endDate = Date.parse(endDate);
  }

  _createClass(Countdown, [{
    key: "getOriginMillisecond",
    value: function getOriginMillisecond() {
      return this.endDate - this.startDate;
    }
  }, {
    key: "getSecond",
    value: function getSecond() {
      return Math.floor(this.getOriginMillisecond() % this.DAY / 1000) % 60 % 60;
    }
  }, {
    key: "getMinute",
    value: function getMinute() {
      return Math.floor(this.getOriginMillisecond() % this.DAY / (60 * 1000)) % 60;
    }
  }, {
    key: "getHour",
    value: function getHour() {
      return Math.floor(this.getOriginMillisecond() % this.DAY / (60 * 60 * 1000));
    }
  }, {
    key: "getDay",
    value: function getDay() {
      return Math.floor(this.getOriginMillisecond() / this.DAY);
    }
  }, {
    key: "getWeek",
    value: function getWeek() {
      return Math.floor(this.getDay() % 7);
    }
  }, {
    key: "getOriginMonth",
    value: function getOriginMonth() {
      var month = differenceInMonths(new Date(this.endDate), new Date(this.startDate));
      return month;
    }
  }, {
    key: "getMonth",
    value: function getMonth() {
      return this.getOriginMonth() % 12;
    }
  }, {
    key: "getYear",
    value: function getYear() {
      return Math.floor(this.getMonth() / 12);
    }
  }]);

  return Countdown;
}();

exports.default = Countdown;

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(61)
var differenceInCalendarMonths = __webpack_require__(92)
var compareAsc = __webpack_require__(93)

/**
 * @category Month Helpers
 * @summary Get the number of full months between the given dates.
 *
 * @description
 * Get the number of full months between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of full months
 *
 * @example
 * // How many full months are between 31 January 2014 and 1 September 2014?
 * var result = differenceInMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 7
 */
function differenceInMonths (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)

  var sign = compareAsc(dateLeft, dateRight)
  var difference = Math.abs(differenceInCalendarMonths(dateLeft, dateRight))
  dateLeft.setMonth(dateLeft.getMonth() - sign * difference)

  // Math.abs(diff in full months - diff in calendar months) === 1 if last calendar month is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastMonthNotFull = compareAsc(dateLeft, dateRight) === -sign
  return sign * (difference - isLastMonthNotFull)
}

module.exports = differenceInMonths


/***/ }),

/***/ 91:
/***/ (function(module, exports) {

/**
 * @category Common Helpers
 * @summary Is the given argument an instance of Date?
 *
 * @description
 * Is the given argument an instance of Date?
 *
 * @param {*} argument - the argument to check
 * @returns {Boolean} the given argument is an instance of Date
 *
 * @example
 * // Is 'mayonnaise' a Date?
 * var result = isDate('mayonnaise')
 * //=> false
 */
function isDate (argument) {
  return argument instanceof Date
}

module.exports = isDate


/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(61)

/**
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar months
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * var result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
function differenceInCalendarMonths (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)

  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear()
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth()

  return yearDiff * 12 + monthDiff
}

module.exports = differenceInCalendarMonths


/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(61)

/**
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param {Date|String|Number} dateLeft - the first date to compare
 * @param {Date|String|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * var result = compareAsc(
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * )
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * var result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
function compareAsc (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var timeLeft = dateLeft.getTime()
  var dateRight = parse(dirtyDateRight)
  var timeRight = dateRight.getTime()

  if (timeLeft < timeRight) {
    return -1
  } else if (timeLeft > timeRight) {
    return 1
  } else {
    return 0
  }
}

module.exports = compareAsc


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGNlMTA1ZDYyYWY4ZDgyNmU4ZjQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3BhcnNlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9Db3VudGRvd24udHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fbW9udGhzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19kYXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaWZmZXJlbmNlX2luX2NhbGVuZGFyX21vbnRocy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvY29tcGFyZV9hc2MvaW5kZXguanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJkaWZmZXJlbmNlSW5Nb250aHMiLCJyZXF1aXJlIiwiQ291bnRkb3duIiwic3RhcnREYXRlIiwiRGF0ZSIsIm5vdyIsImVuZERhdGUiLCJEQVkiLCJwYXJzZSIsIk1hdGgiLCJmbG9vciIsImdldE9yaWdpbk1pbGxpc2Vjb25kIiwiZ2V0RGF5IiwibW9udGgiLCJnZXRPcmlnaW5Nb250aCIsImdldE1vbnRoIiwiZGVmYXVsdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QixFQUFFO0FBQzNCO0FBQ0EsWUFBWSxFQUFFO0FBQ2QsWUFBWSxFQUFFO0FBQ2QsWUFBWSxFQUFFO0FBQ2Q7O0FBRUEsMkJBQTJCLEVBQUU7QUFDN0I7QUFDQSxZQUFZLEVBQUU7QUFDZCxZQUFZLEVBQUU7QUFDZCxZQUFZLEVBQUU7QUFDZDs7QUFFQTtBQUNBLDBCQUEwQixFQUFFO0FBQzVCLDRCQUE0QixFQUFFO0FBQzlCLDZCQUE2QixFQUFFLE9BQU8sRUFBRTtBQUN4Qyw2QkFBNkIsRUFBRTtBQUMvQiw4QkFBOEIsRUFBRSxPQUFPLEVBQUU7O0FBRXpDO0FBQ0EseUJBQXlCLEVBQUU7QUFDM0IsMkJBQTJCLEVBQUUsT0FBTyxFQUFFO0FBQ3RDLDZCQUE2QixFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUU7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxFQUFFO0FBQ3pDLHlDQUF5QyxFQUFFLE9BQU8sRUFBRTs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsT0FBTztBQUNsQixXQUFXLFVBQVU7QUFDckIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxvQkFBb0I7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixXQUFXLG1CQUFtQjtBQUM5QixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6IkNvdW50ZG93bi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDg5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0Y2UxMDVkNjJhZjhkODI2ZThmNCIsInZhciBpc0RhdGUgPSByZXF1aXJlKCcuLi9pc19kYXRlL2luZGV4LmpzJylcblxudmFyIE1JTExJU0VDT05EU19JTl9IT1VSID0gMzYwMDAwMFxudmFyIE1JTExJU0VDT05EU19JTl9NSU5VVEUgPSA2MDAwMFxudmFyIERFRkFVTFRfQURESVRJT05BTF9ESUdJVFMgPSAyXG5cbnZhciBwYXJzZVRva2VuRGF0ZVRpbWVEZWxpbWV0ZXIgPSAvW1QgXS9cbnZhciBwYXJzZVRva2VuUGxhaW5UaW1lID0gLzovXG5cbi8vIHllYXIgdG9rZW5zXG52YXIgcGFyc2VUb2tlbllZID0gL14oXFxkezJ9KSQvXG52YXIgcGFyc2VUb2tlbnNZWVkgPSBbXG4gIC9eKFsrLV1cXGR7Mn0pJC8sIC8vIDAgYWRkaXRpb25hbCBkaWdpdHNcbiAgL14oWystXVxcZHszfSkkLywgLy8gMSBhZGRpdGlvbmFsIGRpZ2l0XG4gIC9eKFsrLV1cXGR7NH0pJC8gLy8gMiBhZGRpdGlvbmFsIGRpZ2l0c1xuXVxuXG52YXIgcGFyc2VUb2tlbllZWVkgPSAvXihcXGR7NH0pL1xudmFyIHBhcnNlVG9rZW5zWVlZWVkgPSBbXG4gIC9eKFsrLV1cXGR7NH0pLywgLy8gMCBhZGRpdGlvbmFsIGRpZ2l0c1xuICAvXihbKy1dXFxkezV9KS8sIC8vIDEgYWRkaXRpb25hbCBkaWdpdFxuICAvXihbKy1dXFxkezZ9KS8gLy8gMiBhZGRpdGlvbmFsIGRpZ2l0c1xuXVxuXG4vLyBkYXRlIHRva2Vuc1xudmFyIHBhcnNlVG9rZW5NTSA9IC9eLShcXGR7Mn0pJC9cbnZhciBwYXJzZVRva2VuREREID0gL14tPyhcXGR7M30pJC9cbnZhciBwYXJzZVRva2VuTU1ERCA9IC9eLT8oXFxkezJ9KS0/KFxcZHsyfSkkL1xudmFyIHBhcnNlVG9rZW5Xd3cgPSAvXi0/VyhcXGR7Mn0pJC9cbnZhciBwYXJzZVRva2VuV3d3RCA9IC9eLT9XKFxcZHsyfSktPyhcXGR7MX0pJC9cblxuLy8gdGltZSB0b2tlbnNcbnZhciBwYXJzZVRva2VuSEggPSAvXihcXGR7Mn0oWy4sXVxcZCopPykkL1xudmFyIHBhcnNlVG9rZW5ISE1NID0gL14oXFxkezJ9KTo/KFxcZHsyfShbLixdXFxkKik/KSQvXG52YXIgcGFyc2VUb2tlbkhITU1TUyA9IC9eKFxcZHsyfSk6PyhcXGR7Mn0pOj8oXFxkezJ9KFsuLF1cXGQqKT8pJC9cblxuLy8gdGltZXpvbmUgdG9rZW5zXG52YXIgcGFyc2VUb2tlblRpbWV6b25lID0gLyhbWistXS4qKSQvXG52YXIgcGFyc2VUb2tlblRpbWV6b25lWiA9IC9eKFopJC9cbnZhciBwYXJzZVRva2VuVGltZXpvbmVISCA9IC9eKFsrLV0pKFxcZHsyfSkkL1xudmFyIHBhcnNlVG9rZW5UaW1lem9uZUhITU0gPSAvXihbKy1dKShcXGR7Mn0pOj8oXFxkezJ9KSQvXG5cbi8qKlxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiBhbiBhcmd1bWVudCBpcyBhIHN0cmluZywgdGhlIGZ1bmN0aW9uIHRyaWVzIHRvIHBhcnNlIGl0LlxuICogRnVuY3Rpb24gYWNjZXB0cyBjb21wbGV0ZSBJU08gODYwMSBmb3JtYXRzIGFzIHdlbGwgYXMgcGFydGlhbCBpbXBsZW1lbnRhdGlvbnMuXG4gKiBJU08gODYwMTogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fODYwMVxuICpcbiAqIElmIGFsbCBhYm92ZSBmYWlscywgdGhlIGZ1bmN0aW9uIHBhc3NlcyB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gRGF0ZSBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gYXJndW1lbnQgLSB0aGUgdmFsdWUgdG8gY29udmVydFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIHRoZSBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKiBAcGFyYW0gezAgfCAxIHwgMn0gW29wdGlvbnMuYWRkaXRpb25hbERpZ2l0cz0yXSAtIHRoZSBhZGRpdGlvbmFsIG51bWJlciBvZiBkaWdpdHMgaW4gdGhlIGV4dGVuZGVkIHllYXIgZm9ybWF0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCBzdHJpbmcgJzIwMTQtMDItMTFUMTE6MzA6MzAnIHRvIGRhdGU6XG4gKiB2YXIgcmVzdWx0ID0gcGFyc2UoJzIwMTQtMDItMTFUMTE6MzA6MzAnKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUGFyc2Ugc3RyaW5nICcrMDIwMTQxMDEnLFxuICogLy8gaWYgdGhlIGFkZGl0aW9uYWwgbnVtYmVyIG9mIGRpZ2l0cyBpbiB0aGUgZXh0ZW5kZWQgeWVhciBmb3JtYXQgaXMgMTpcbiAqIHZhciByZXN1bHQgPSBwYXJzZSgnKzAyMDE0MTAxJywge2FkZGl0aW9uYWxEaWdpdHM6IDF9KVxuICogLy89PiBGcmkgQXByIDExIDIwMTQgMDA6MDA6MDBcbiAqL1xuZnVuY3Rpb24gcGFyc2UgKGFyZ3VtZW50LCBkaXJ0eU9wdGlvbnMpIHtcbiAgaWYgKGlzRGF0ZShhcmd1bWVudCkpIHtcbiAgICAvLyBQcmV2ZW50IHRoZSBkYXRlIHRvIGxvc2UgdGhlIG1pbGxpc2Vjb25kcyB3aGVuIHBhc3NlZCB0byBuZXcgRGF0ZSgpIGluIElFMTBcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQuZ2V0VGltZSgpKVxuICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpXG4gIH1cblxuICB2YXIgb3B0aW9ucyA9IGRpcnR5T3B0aW9ucyB8fCB7fVxuICB2YXIgYWRkaXRpb25hbERpZ2l0cyA9IG9wdGlvbnMuYWRkaXRpb25hbERpZ2l0c1xuICBpZiAoYWRkaXRpb25hbERpZ2l0cyA9PSBudWxsKSB7XG4gICAgYWRkaXRpb25hbERpZ2l0cyA9IERFRkFVTFRfQURESVRJT05BTF9ESUdJVFNcbiAgfSBlbHNlIHtcbiAgICBhZGRpdGlvbmFsRGlnaXRzID0gTnVtYmVyKGFkZGl0aW9uYWxEaWdpdHMpXG4gIH1cblxuICB2YXIgZGF0ZVN0cmluZ3MgPSBzcGxpdERhdGVTdHJpbmcoYXJndW1lbnQpXG5cbiAgdmFyIHBhcnNlWWVhclJlc3VsdCA9IHBhcnNlWWVhcihkYXRlU3RyaW5ncy5kYXRlLCBhZGRpdGlvbmFsRGlnaXRzKVxuICB2YXIgeWVhciA9IHBhcnNlWWVhclJlc3VsdC55ZWFyXG4gIHZhciByZXN0RGF0ZVN0cmluZyA9IHBhcnNlWWVhclJlc3VsdC5yZXN0RGF0ZVN0cmluZ1xuXG4gIHZhciBkYXRlID0gcGFyc2VEYXRlKHJlc3REYXRlU3RyaW5nLCB5ZWFyKVxuXG4gIGlmIChkYXRlKSB7XG4gICAgdmFyIHRpbWVzdGFtcCA9IGRhdGUuZ2V0VGltZSgpXG4gICAgdmFyIHRpbWUgPSAwXG4gICAgdmFyIG9mZnNldFxuXG4gICAgaWYgKGRhdGVTdHJpbmdzLnRpbWUpIHtcbiAgICAgIHRpbWUgPSBwYXJzZVRpbWUoZGF0ZVN0cmluZ3MudGltZSlcbiAgICB9XG5cbiAgICBpZiAoZGF0ZVN0cmluZ3MudGltZXpvbmUpIHtcbiAgICAgIG9mZnNldCA9IHBhcnNlVGltZXpvbmUoZGF0ZVN0cmluZ3MudGltZXpvbmUpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGdldCBvZmZzZXQgYWNjdXJhdGUgdG8gaG91ciBpbiB0aW1lem9uZXMgdGhhdCBjaGFuZ2Ugb2Zmc2V0XG4gICAgICBvZmZzZXQgPSBuZXcgRGF0ZSh0aW1lc3RhbXAgKyB0aW1lKS5nZXRUaW1lem9uZU9mZnNldCgpXG4gICAgICBvZmZzZXQgPSBuZXcgRGF0ZSh0aW1lc3RhbXAgKyB0aW1lICsgb2Zmc2V0ICogTUlMTElTRUNPTkRTX0lOX01JTlVURSkuZ2V0VGltZXpvbmVPZmZzZXQoKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXAgKyB0aW1lICsgb2Zmc2V0ICogTUlMTElTRUNPTkRTX0lOX01JTlVURSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpXG4gIH1cbn1cblxuZnVuY3Rpb24gc3BsaXREYXRlU3RyaW5nIChkYXRlU3RyaW5nKSB7XG4gIHZhciBkYXRlU3RyaW5ncyA9IHt9XG4gIHZhciBhcnJheSA9IGRhdGVTdHJpbmcuc3BsaXQocGFyc2VUb2tlbkRhdGVUaW1lRGVsaW1ldGVyKVxuICB2YXIgdGltZVN0cmluZ1xuXG4gIGlmIChwYXJzZVRva2VuUGxhaW5UaW1lLnRlc3QoYXJyYXlbMF0pKSB7XG4gICAgZGF0ZVN0cmluZ3MuZGF0ZSA9IG51bGxcbiAgICB0aW1lU3RyaW5nID0gYXJyYXlbMF1cbiAgfSBlbHNlIHtcbiAgICBkYXRlU3RyaW5ncy5kYXRlID0gYXJyYXlbMF1cbiAgICB0aW1lU3RyaW5nID0gYXJyYXlbMV1cbiAgfVxuXG4gIGlmICh0aW1lU3RyaW5nKSB7XG4gICAgdmFyIHRva2VuID0gcGFyc2VUb2tlblRpbWV6b25lLmV4ZWModGltZVN0cmluZylcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIGRhdGVTdHJpbmdzLnRpbWUgPSB0aW1lU3RyaW5nLnJlcGxhY2UodG9rZW5bMV0sICcnKVxuICAgICAgZGF0ZVN0cmluZ3MudGltZXpvbmUgPSB0b2tlblsxXVxuICAgIH0gZWxzZSB7XG4gICAgICBkYXRlU3RyaW5ncy50aW1lID0gdGltZVN0cmluZ1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkYXRlU3RyaW5nc1xufVxuXG5mdW5jdGlvbiBwYXJzZVllYXIgKGRhdGVTdHJpbmcsIGFkZGl0aW9uYWxEaWdpdHMpIHtcbiAgdmFyIHBhcnNlVG9rZW5ZWVkgPSBwYXJzZVRva2Vuc1lZWVthZGRpdGlvbmFsRGlnaXRzXVxuICB2YXIgcGFyc2VUb2tlbllZWVlZID0gcGFyc2VUb2tlbnNZWVlZWVthZGRpdGlvbmFsRGlnaXRzXVxuXG4gIHZhciB0b2tlblxuXG4gIC8vIFlZWVkgb3IgwrFZWVlZWVxuICB0b2tlbiA9IHBhcnNlVG9rZW5ZWVlZLmV4ZWMoZGF0ZVN0cmluZykgfHwgcGFyc2VUb2tlbllZWVlZLmV4ZWMoZGF0ZVN0cmluZylcbiAgaWYgKHRva2VuKSB7XG4gICAgdmFyIHllYXJTdHJpbmcgPSB0b2tlblsxXVxuICAgIHJldHVybiB7XG4gICAgICB5ZWFyOiBwYXJzZUludCh5ZWFyU3RyaW5nLCAxMCksXG4gICAgICByZXN0RGF0ZVN0cmluZzogZGF0ZVN0cmluZy5zbGljZSh5ZWFyU3RyaW5nLmxlbmd0aClcbiAgICB9XG4gIH1cblxuICAvLyBZWSBvciDCsVlZWVxuICB0b2tlbiA9IHBhcnNlVG9rZW5ZWS5leGVjKGRhdGVTdHJpbmcpIHx8IHBhcnNlVG9rZW5ZWVkuZXhlYyhkYXRlU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICB2YXIgY2VudHVyeVN0cmluZyA9IHRva2VuWzFdXG4gICAgcmV0dXJuIHtcbiAgICAgIHllYXI6IHBhcnNlSW50KGNlbnR1cnlTdHJpbmcsIDEwKSAqIDEwMCxcbiAgICAgIHJlc3REYXRlU3RyaW5nOiBkYXRlU3RyaW5nLnNsaWNlKGNlbnR1cnlTdHJpbmcubGVuZ3RoKVxuICAgIH1cbiAgfVxuXG4gIC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCB5ZWFyXG4gIHJldHVybiB7XG4gICAgeWVhcjogbnVsbFxuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGF0ZSAoZGF0ZVN0cmluZywgeWVhcikge1xuICAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgeWVhclxuICBpZiAoeWVhciA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICB2YXIgdG9rZW5cbiAgdmFyIGRhdGVcbiAgdmFyIG1vbnRoXG4gIHZhciB3ZWVrXG5cbiAgLy8gWVlZWVxuICBpZiAoZGF0ZVN0cmluZy5sZW5ndGggPT09IDApIHtcbiAgICBkYXRlID0gbmV3IERhdGUoMClcbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKHllYXIpXG4gICAgcmV0dXJuIGRhdGVcbiAgfVxuXG4gIC8vIFlZWVktTU1cbiAgdG9rZW4gPSBwYXJzZVRva2VuTU0uZXhlYyhkYXRlU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICBkYXRlID0gbmV3IERhdGUoMClcbiAgICBtb250aCA9IHBhcnNlSW50KHRva2VuWzFdLCAxMCkgLSAxXG4gICAgZGF0ZS5zZXRVVENGdWxsWWVhcih5ZWFyLCBtb250aClcbiAgICByZXR1cm4gZGF0ZVxuICB9XG5cbiAgLy8gWVlZWS1EREQgb3IgWVlZWURERFxuICB0b2tlbiA9IHBhcnNlVG9rZW5EREQuZXhlYyhkYXRlU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICBkYXRlID0gbmV3IERhdGUoMClcbiAgICB2YXIgZGF5T2ZZZWFyID0gcGFyc2VJbnQodG9rZW5bMV0sIDEwKVxuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeWVhciwgMCwgZGF5T2ZZZWFyKVxuICAgIHJldHVybiBkYXRlXG4gIH1cblxuICAvLyBZWVlZLU1NLUREIG9yIFlZWVlNTUREXG4gIHRva2VuID0gcGFyc2VUb2tlbk1NREQuZXhlYyhkYXRlU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICBkYXRlID0gbmV3IERhdGUoMClcbiAgICBtb250aCA9IHBhcnNlSW50KHRva2VuWzFdLCAxMCkgLSAxXG4gICAgdmFyIGRheSA9IHBhcnNlSW50KHRva2VuWzJdLCAxMClcbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKHllYXIsIG1vbnRoLCBkYXkpXG4gICAgcmV0dXJuIGRhdGVcbiAgfVxuXG4gIC8vIFlZWVktV3d3IG9yIFlZWVlXd3dcbiAgdG9rZW4gPSBwYXJzZVRva2VuV3d3LmV4ZWMoZGF0ZVN0cmluZylcbiAgaWYgKHRva2VuKSB7XG4gICAgd2VlayA9IHBhcnNlSW50KHRva2VuWzFdLCAxMCkgLSAxXG4gICAgcmV0dXJuIGRheU9mSVNPWWVhcih5ZWFyLCB3ZWVrKVxuICB9XG5cbiAgLy8gWVlZWS1Xd3ctRCBvciBZWVlZV3d3RFxuICB0b2tlbiA9IHBhcnNlVG9rZW5Xd3dELmV4ZWMoZGF0ZVN0cmluZylcbiAgaWYgKHRva2VuKSB7XG4gICAgd2VlayA9IHBhcnNlSW50KHRva2VuWzFdLCAxMCkgLSAxXG4gICAgdmFyIGRheU9mV2VlayA9IHBhcnNlSW50KHRva2VuWzJdLCAxMCkgLSAxXG4gICAgcmV0dXJuIGRheU9mSVNPWWVhcih5ZWFyLCB3ZWVrLCBkYXlPZldlZWspXG4gIH1cblxuICAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgZGF0ZVxuICByZXR1cm4gbnVsbFxufVxuXG5mdW5jdGlvbiBwYXJzZVRpbWUgKHRpbWVTdHJpbmcpIHtcbiAgdmFyIHRva2VuXG4gIHZhciBob3Vyc1xuICB2YXIgbWludXRlc1xuXG4gIC8vIGhoXG4gIHRva2VuID0gcGFyc2VUb2tlbkhILmV4ZWModGltZVN0cmluZylcbiAgaWYgKHRva2VuKSB7XG4gICAgaG91cnMgPSBwYXJzZUZsb2F0KHRva2VuWzFdLnJlcGxhY2UoJywnLCAnLicpKVxuICAgIHJldHVybiAoaG91cnMgJSAyNCkgKiBNSUxMSVNFQ09ORFNfSU5fSE9VUlxuICB9XG5cbiAgLy8gaGg6bW0gb3IgaGhtbVxuICB0b2tlbiA9IHBhcnNlVG9rZW5ISE1NLmV4ZWModGltZVN0cmluZylcbiAgaWYgKHRva2VuKSB7XG4gICAgaG91cnMgPSBwYXJzZUludCh0b2tlblsxXSwgMTApXG4gICAgbWludXRlcyA9IHBhcnNlRmxvYXQodG9rZW5bMl0ucmVwbGFjZSgnLCcsICcuJykpXG4gICAgcmV0dXJuIChob3VycyAlIDI0KSAqIE1JTExJU0VDT05EU19JTl9IT1VSICtcbiAgICAgIG1pbnV0ZXMgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFXG4gIH1cblxuICAvLyBoaDptbTpzcyBvciBoaG1tc3NcbiAgdG9rZW4gPSBwYXJzZVRva2VuSEhNTVNTLmV4ZWModGltZVN0cmluZylcbiAgaWYgKHRva2VuKSB7XG4gICAgaG91cnMgPSBwYXJzZUludCh0b2tlblsxXSwgMTApXG4gICAgbWludXRlcyA9IHBhcnNlSW50KHRva2VuWzJdLCAxMClcbiAgICB2YXIgc2Vjb25kcyA9IHBhcnNlRmxvYXQodG9rZW5bM10ucmVwbGFjZSgnLCcsICcuJykpXG4gICAgcmV0dXJuIChob3VycyAlIDI0KSAqIE1JTExJU0VDT05EU19JTl9IT1VSICtcbiAgICAgIG1pbnV0ZXMgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFICtcbiAgICAgIHNlY29uZHMgKiAxMDAwXG4gIH1cblxuICAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgdGltZVxuICByZXR1cm4gbnVsbFxufVxuXG5mdW5jdGlvbiBwYXJzZVRpbWV6b25lICh0aW1lem9uZVN0cmluZykge1xuICB2YXIgdG9rZW5cbiAgdmFyIGFic29sdXRlT2Zmc2V0XG5cbiAgLy8gWlxuICB0b2tlbiA9IHBhcnNlVG9rZW5UaW1lem9uZVouZXhlYyh0aW1lem9uZVN0cmluZylcbiAgaWYgKHRva2VuKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuXG4gIC8vIMKxaGhcbiAgdG9rZW4gPSBwYXJzZVRva2VuVGltZXpvbmVISC5leGVjKHRpbWV6b25lU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICBhYnNvbHV0ZU9mZnNldCA9IHBhcnNlSW50KHRva2VuWzJdLCAxMCkgKiA2MFxuICAgIHJldHVybiAodG9rZW5bMV0gPT09ICcrJykgPyAtYWJzb2x1dGVPZmZzZXQgOiBhYnNvbHV0ZU9mZnNldFxuICB9XG5cbiAgLy8gwrFoaDptbSBvciDCsWhobW1cbiAgdG9rZW4gPSBwYXJzZVRva2VuVGltZXpvbmVISE1NLmV4ZWModGltZXpvbmVTdHJpbmcpXG4gIGlmICh0b2tlbikge1xuICAgIGFic29sdXRlT2Zmc2V0ID0gcGFyc2VJbnQodG9rZW5bMl0sIDEwKSAqIDYwICsgcGFyc2VJbnQodG9rZW5bM10sIDEwKVxuICAgIHJldHVybiAodG9rZW5bMV0gPT09ICcrJykgPyAtYWJzb2x1dGVPZmZzZXQgOiBhYnNvbHV0ZU9mZnNldFxuICB9XG5cbiAgcmV0dXJuIDBcbn1cblxuZnVuY3Rpb24gZGF5T2ZJU09ZZWFyIChpc29ZZWFyLCB3ZWVrLCBkYXkpIHtcbiAgd2VlayA9IHdlZWsgfHwgMFxuICBkYXkgPSBkYXkgfHwgMFxuICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDApXG4gIGRhdGUuc2V0VVRDRnVsbFllYXIoaXNvWWVhciwgMCwgNClcbiAgdmFyIGZvdXJ0aE9mSmFudWFyeURheSA9IGRhdGUuZ2V0VVRDRGF5KCkgfHwgN1xuICB2YXIgZGlmZiA9IHdlZWsgKiA3ICsgZGF5ICsgMSAtIGZvdXJ0aE9mSmFudWFyeURheVxuICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBkaWZmKVxuICByZXR1cm4gZGF0ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kYXRlLWZucy9wYXJzZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSA1IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBkaWZmZXJlbmNlSW5Nb250aHMgPSByZXF1aXJlKFwiZGF0ZS1mbnMvZGlmZmVyZW5jZV9pbl9tb250aHNcIik7XG5jbGFzcyBDb3VudGRvd24ge1xuICAgIC8qKlxuICAgICAqIGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHtEYXRlfSBzdGFydERhdGVcbiAgICAgKiBAcGFyYW0ge0RhdGV9IGVuZERhdGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzdGFydERhdGUgPSBEYXRlLm5vdygpLCBlbmREYXRlKSB7XG4gICAgICAgIHRoaXMuREFZID0gMjQgKiA2MCAqIDYwICogMTAwMDtcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSBzdGFydERhdGU7XG4gICAgICAgIHRoaXMuZW5kRGF0ZSA9IERhdGUucGFyc2UoZW5kRGF0ZSk7XG4gICAgfVxuICAgIGdldE9yaWdpbk1pbGxpc2Vjb25kKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbmREYXRlIC0gdGhpcy5zdGFydERhdGU7XG4gICAgfVxuICAgIGdldFNlY29uZCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKHRoaXMuZ2V0T3JpZ2luTWlsbGlzZWNvbmQoKSAlIHRoaXMuREFZKSAvIDEwMDApICUgNjAgJSA2MDtcbiAgICB9XG4gICAgZ2V0TWludXRlKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigodGhpcy5nZXRPcmlnaW5NaWxsaXNlY29uZCgpICUgdGhpcy5EQVkpIC8gKDYwICogMTAwMCkpICUgNjA7XG4gICAgfVxuICAgIGdldEhvdXIoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCh0aGlzLmdldE9yaWdpbk1pbGxpc2Vjb25kKCkgJSB0aGlzLkRBWSkgLyAoNjAgKiA2MCAqIDEwMDApKTtcbiAgICB9XG4gICAgZ2V0RGF5KCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmdldE9yaWdpbk1pbGxpc2Vjb25kKCkgLyB0aGlzLkRBWSk7XG4gICAgfVxuICAgIGdldFdlZWsoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuZ2V0RGF5KCkgJSA3KTtcbiAgICB9XG4gICAgZ2V0T3JpZ2luTW9udGgoKSB7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gZGlmZmVyZW5jZUluTW9udGhzKG5ldyBEYXRlKHRoaXMuZW5kRGF0ZSksIG5ldyBEYXRlKHRoaXMuc3RhcnREYXRlKSk7XG4gICAgICAgIHJldHVybiBtb250aDtcbiAgICB9XG4gICAgZ2V0TW9udGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE9yaWdpbk1vbnRoKCkgJSAxMjtcbiAgICB9XG4gICAgZ2V0WWVhcigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5nZXRNb250aCgpIC8gMTIpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IENvdW50ZG93bjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Db3VudGRvd24udHMiLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG52YXIgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMgPSByZXF1aXJlKCcuLi9kaWZmZXJlbmNlX2luX2NhbGVuZGFyX21vbnRocy9pbmRleC5qcycpXG52YXIgY29tcGFyZUFzYyA9IHJlcXVpcmUoJy4uL2NvbXBhcmVfYXNjL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgZnVsbCBtb250aHMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIG51bWJlciBvZiBmdWxsIG1vbnRocyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBlYXJsaWVyIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBudW1iZXIgb2YgZnVsbCBtb250aHNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgZnVsbCBtb250aHMgYXJlIGJldHdlZW4gMzEgSmFudWFyeSAyMDE0IGFuZCAxIFNlcHRlbWJlciAyMDE0P1xuICogdmFyIHJlc3VsdCA9IGRpZmZlcmVuY2VJbk1vbnRocyhcbiAqICAgbmV3IERhdGUoMjAxNCwgOCwgMSksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDAsIDMxKVxuICogKVxuICogLy89PiA3XG4gKi9cbmZ1bmN0aW9uIGRpZmZlcmVuY2VJbk1vbnRocyAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIGRhdGVMZWZ0ID0gcGFyc2UoZGlydHlEYXRlTGVmdClcbiAgdmFyIGRhdGVSaWdodCA9IHBhcnNlKGRpcnR5RGF0ZVJpZ2h0KVxuXG4gIHZhciBzaWduID0gY29tcGFyZUFzYyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KVxuICB2YXIgZGlmZmVyZW5jZSA9IE1hdGguYWJzKGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzKGRhdGVMZWZ0LCBkYXRlUmlnaHQpKVxuICBkYXRlTGVmdC5zZXRNb250aChkYXRlTGVmdC5nZXRNb250aCgpIC0gc2lnbiAqIGRpZmZlcmVuY2UpXG5cbiAgLy8gTWF0aC5hYnMoZGlmZiBpbiBmdWxsIG1vbnRocyAtIGRpZmYgaW4gY2FsZW5kYXIgbW9udGhzKSA9PT0gMSBpZiBsYXN0IGNhbGVuZGFyIG1vbnRoIGlzIG5vdCBmdWxsXG4gIC8vIElmIHNvLCByZXN1bHQgbXVzdCBiZSBkZWNyZWFzZWQgYnkgMSBpbiBhYnNvbHV0ZSB2YWx1ZVxuICB2YXIgaXNMYXN0TW9udGhOb3RGdWxsID0gY29tcGFyZUFzYyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KSA9PT0gLXNpZ25cbiAgcmV0dXJuIHNpZ24gKiAoZGlmZmVyZW5jZSAtIGlzTGFzdE1vbnRoTm90RnVsbClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlSW5Nb250aHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fbW9udGhzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA5MFxuLy8gbW9kdWxlIGNodW5rcyA9IDUiLCIvKipcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGFyZ3VtZW50IGFuIGluc3RhbmNlIG9mIERhdGU/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gYXJndW1lbnQgYW4gaW5zdGFuY2Ugb2YgRGF0ZT9cbiAqXG4gKiBAcGFyYW0geyp9IGFyZ3VtZW50IC0gdGhlIGFyZ3VtZW50IHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGdpdmVuIGFyZ3VtZW50IGlzIGFuIGluc3RhbmNlIG9mIERhdGVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSXMgJ21heW9ubmFpc2UnIGEgRGF0ZT9cbiAqIHZhciByZXN1bHQgPSBpc0RhdGUoJ21heW9ubmFpc2UnKVxuICogLy89PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUgKGFyZ3VtZW50KSB7XG4gIHJldHVybiBhcmd1bWVudCBpbnN0YW5jZW9mIERhdGVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0RhdGVcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzX2RhdGUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDkxXG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgbW9udGhzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgbW9udGhzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIGVhcmxpZXIgZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBjYWxlbmRhciBtb250aHNcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSG93IG1hbnkgY2FsZW5kYXIgbW9udGhzIGFyZSBiZXR3ZWVuIDMxIEphbnVhcnkgMjAxNCBhbmQgMSBTZXB0ZW1iZXIgMjAxND9cbiAqIHZhciByZXN1bHQgPSBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhcbiAqICAgbmV3IERhdGUoMjAxNCwgOCwgMSksXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDAsIDMxKVxuICogKVxuICogLy89PiA4XG4gKi9cbmZ1bmN0aW9uIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGF0ZUxlZnQgPSBwYXJzZShkaXJ0eURhdGVMZWZ0KVxuICB2YXIgZGF0ZVJpZ2h0ID0gcGFyc2UoZGlydHlEYXRlUmlnaHQpXG5cbiAgdmFyIHllYXJEaWZmID0gZGF0ZUxlZnQuZ2V0RnVsbFllYXIoKSAtIGRhdGVSaWdodC5nZXRGdWxsWWVhcigpXG4gIHZhciBtb250aERpZmYgPSBkYXRlTGVmdC5nZXRNb250aCgpIC0gZGF0ZVJpZ2h0LmdldE1vbnRoKClcblxuICByZXR1cm4geWVhckRpZmYgKiAxMiArIG1vbnRoRGlmZlxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaWZmZXJlbmNlX2luX2NhbGVuZGFyX21vbnRocy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gOTJcbi8vIG1vZHVsZSBjaHVua3MgPSA1IiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxuXG4vKipcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29tcGFyZSB0aGUgdHdvIGRhdGVzIGFuZCByZXR1cm4gLTEsIDAgb3IgMS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbXBhcmUgdGhlIHR3byBkYXRlcyBhbmQgcmV0dXJuIDEgaWYgdGhlIGZpcnN0IGRhdGUgaXMgYWZ0ZXIgdGhlIHNlY29uZCxcbiAqIC0xIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGJlZm9yZSB0aGUgc2Vjb25kIG9yIDAgaWYgZGF0ZXMgYXJlIGVxdWFsLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBmaXJzdCBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgc2Vjb25kIGRhdGUgdG8gY29tcGFyZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIHJlc3VsdCBvZiB0aGUgY29tcGFyaXNvblxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb21wYXJlIDExIEZlYnJ1YXJ5IDE5ODcgYW5kIDEwIEp1bHkgMTk4OTpcbiAqIHZhciByZXN1bHQgPSBjb21wYXJlQXNjKFxuICogICBuZXcgRGF0ZSgxOTg3LCAxLCAxMSksXG4gKiAgIG5ldyBEYXRlKDE5ODksIDYsIDEwKVxuICogKVxuICogLy89PiAtMVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTb3J0IHRoZSBhcnJheSBvZiBkYXRlczpcbiAqIHZhciByZXN1bHQgPSBbXG4gKiAgIG5ldyBEYXRlKDE5OTUsIDYsIDIpLFxuICogICBuZXcgRGF0ZSgxOTg3LCAxLCAxMSksXG4gKiAgIG5ldyBEYXRlKDE5ODksIDYsIDEwKVxuICogXS5zb3J0KGNvbXBhcmVBc2MpXG4gKiAvLz0+IFtcbiAqIC8vICAgV2VkIEZlYiAxMSAxOTg3IDAwOjAwOjAwLFxuICogLy8gICBNb24gSnVsIDEwIDE5ODkgMDA6MDA6MDAsXG4gKiAvLyAgIFN1biBKdWwgMDIgMTk5NSAwMDowMDowMFxuICogLy8gXVxuICovXG5mdW5jdGlvbiBjb21wYXJlQXNjIChkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICB2YXIgZGF0ZUxlZnQgPSBwYXJzZShkaXJ0eURhdGVMZWZ0KVxuICB2YXIgdGltZUxlZnQgPSBkYXRlTGVmdC5nZXRUaW1lKClcbiAgdmFyIGRhdGVSaWdodCA9IHBhcnNlKGRpcnR5RGF0ZVJpZ2h0KVxuICB2YXIgdGltZVJpZ2h0ID0gZGF0ZVJpZ2h0LmdldFRpbWUoKVxuXG4gIGlmICh0aW1lTGVmdCA8IHRpbWVSaWdodCkge1xuICAgIHJldHVybiAtMVxuICB9IGVsc2UgaWYgKHRpbWVMZWZ0ID4gdGltZVJpZ2h0KSB7XG4gICAgcmV0dXJuIDFcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gMFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29tcGFyZUFzY1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvY29tcGFyZV9hc2MvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDkzXG4vLyBtb2R1bGUgY2h1bmtzID0gNSJdLCJzb3VyY2VSb290IjoiIn0=