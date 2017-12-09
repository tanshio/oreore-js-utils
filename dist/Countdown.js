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
/******/ 	return __webpack_require__(__webpack_require__.s = 56);
/******/ })
/************************************************************************/
/******/ ({

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

var isDate = __webpack_require__(58)

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

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var differenceInMonths = __webpack_require__(57);

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

exports.Countdown = Countdown;

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(40)
var differenceInCalendarMonths = __webpack_require__(59)
var compareAsc = __webpack_require__(60)

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

/***/ 58:
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

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(40)

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

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(40)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjA5OTQzMmQ5ZjFiYzVjYTlmYjMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3BhcnNlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9Db3VudGRvd24udHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fbW9udGhzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19kYXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaWZmZXJlbmNlX2luX2NhbGVuZGFyX21vbnRocy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvY29tcGFyZV9hc2MvaW5kZXguanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJkaWZmZXJlbmNlSW5Nb250aHMiLCJyZXF1aXJlIiwiQ291bnRkb3duIiwic3RhcnREYXRlIiwiRGF0ZSIsIm5vdyIsImVuZERhdGUiLCJEQVkiLCJwYXJzZSIsIk1hdGgiLCJmbG9vciIsImdldE9yaWdpbk1pbGxpc2Vjb25kIiwiZ2V0RGF5IiwibW9udGgiLCJnZXRPcmlnaW5Nb250aCIsImdldE1vbnRoIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QixFQUFFO0FBQzNCO0FBQ0EsWUFBWSxFQUFFO0FBQ2QsWUFBWSxFQUFFO0FBQ2QsWUFBWSxFQUFFO0FBQ2Q7O0FBRUEsMkJBQTJCLEVBQUU7QUFDN0I7QUFDQSxZQUFZLEVBQUU7QUFDZCxZQUFZLEVBQUU7QUFDZCxZQUFZLEVBQUU7QUFDZDs7QUFFQTtBQUNBLDBCQUEwQixFQUFFO0FBQzVCLDRCQUE0QixFQUFFO0FBQzlCLDZCQUE2QixFQUFFLE9BQU8sRUFBRTtBQUN4Qyw2QkFBNkIsRUFBRTtBQUMvQiw4QkFBOEIsRUFBRSxPQUFPLEVBQUU7O0FBRXpDO0FBQ0EseUJBQXlCLEVBQUU7QUFDM0IsMkJBQTJCLEVBQUUsT0FBTyxFQUFFO0FBQ3RDLDZCQUE2QixFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUU7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxFQUFFO0FBQ3pDLHlDQUF5QyxFQUFFLE9BQU8sRUFBRTs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsT0FBTztBQUNsQixXQUFXLFVBQVU7QUFDckIsYUFBYSxLQUFLO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxvQkFBb0I7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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O0FBQ0E7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLFdBQVcsbUJBQW1CO0FBQzlCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiQ291bnRkb3duLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNTYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGYwOTk0MzJkOWYxYmM1Y2E5ZmIzIiwidmFyIGlzRGF0ZSA9IHJlcXVpcmUoJy4uL2lzX2RhdGUvaW5kZXguanMnKVxuXG52YXIgTUlMTElTRUNPTkRTX0lOX0hPVVIgPSAzNjAwMDAwXG52YXIgTUlMTElTRUNPTkRTX0lOX01JTlVURSA9IDYwMDAwXG52YXIgREVGQVVMVF9BRERJVElPTkFMX0RJR0lUUyA9IDJcblxudmFyIHBhcnNlVG9rZW5EYXRlVGltZURlbGltZXRlciA9IC9bVCBdL1xudmFyIHBhcnNlVG9rZW5QbGFpblRpbWUgPSAvOi9cblxuLy8geWVhciB0b2tlbnNcbnZhciBwYXJzZVRva2VuWVkgPSAvXihcXGR7Mn0pJC9cbnZhciBwYXJzZVRva2Vuc1lZWSA9IFtcbiAgL14oWystXVxcZHsyfSkkLywgLy8gMCBhZGRpdGlvbmFsIGRpZ2l0c1xuICAvXihbKy1dXFxkezN9KSQvLCAvLyAxIGFkZGl0aW9uYWwgZGlnaXRcbiAgL14oWystXVxcZHs0fSkkLyAvLyAyIGFkZGl0aW9uYWwgZGlnaXRzXG5dXG5cbnZhciBwYXJzZVRva2VuWVlZWSA9IC9eKFxcZHs0fSkvXG52YXIgcGFyc2VUb2tlbnNZWVlZWSA9IFtcbiAgL14oWystXVxcZHs0fSkvLCAvLyAwIGFkZGl0aW9uYWwgZGlnaXRzXG4gIC9eKFsrLV1cXGR7NX0pLywgLy8gMSBhZGRpdGlvbmFsIGRpZ2l0XG4gIC9eKFsrLV1cXGR7Nn0pLyAvLyAyIGFkZGl0aW9uYWwgZGlnaXRzXG5dXG5cbi8vIGRhdGUgdG9rZW5zXG52YXIgcGFyc2VUb2tlbk1NID0gL14tKFxcZHsyfSkkL1xudmFyIHBhcnNlVG9rZW5EREQgPSAvXi0/KFxcZHszfSkkL1xudmFyIHBhcnNlVG9rZW5NTUREID0gL14tPyhcXGR7Mn0pLT8oXFxkezJ9KSQvXG52YXIgcGFyc2VUb2tlbld3dyA9IC9eLT9XKFxcZHsyfSkkL1xudmFyIHBhcnNlVG9rZW5Xd3dEID0gL14tP1coXFxkezJ9KS0/KFxcZHsxfSkkL1xuXG4vLyB0aW1lIHRva2Vuc1xudmFyIHBhcnNlVG9rZW5ISCA9IC9eKFxcZHsyfShbLixdXFxkKik/KSQvXG52YXIgcGFyc2VUb2tlbkhITU0gPSAvXihcXGR7Mn0pOj8oXFxkezJ9KFsuLF1cXGQqKT8pJC9cbnZhciBwYXJzZVRva2VuSEhNTVNTID0gL14oXFxkezJ9KTo/KFxcZHsyfSk6PyhcXGR7Mn0oWy4sXVxcZCopPykkL1xuXG4vLyB0aW1lem9uZSB0b2tlbnNcbnZhciBwYXJzZVRva2VuVGltZXpvbmUgPSAvKFtaKy1dLiopJC9cbnZhciBwYXJzZVRva2VuVGltZXpvbmVaID0gL14oWikkL1xudmFyIHBhcnNlVG9rZW5UaW1lem9uZUhIID0gL14oWystXSkoXFxkezJ9KSQvXG52YXIgcGFyc2VUb2tlblRpbWV6b25lSEhNTSA9IC9eKFsrLV0pKFxcZHsyfSk6PyhcXGR7Mn0pJC9cblxuLyoqXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBpdHMgY2xvbmUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBpdCBpcyB0cmVhdGVkIGFzIGEgdGltZXN0YW1wLlxuICpcbiAqIElmIGFuIGFyZ3VtZW50IGlzIGEgc3RyaW5nLCB0aGUgZnVuY3Rpb24gdHJpZXMgdG8gcGFyc2UgaXQuXG4gKiBGdW5jdGlvbiBhY2NlcHRzIGNvbXBsZXRlIElTTyA4NjAxIGZvcm1hdHMgYXMgd2VsbCBhcyBwYXJ0aWFsIGltcGxlbWVudGF0aW9ucy5cbiAqIElTTyA4NjAxOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT184NjAxXG4gKlxuICogSWYgYWxsIGFib3ZlIGZhaWxzLCB0aGUgZnVuY3Rpb24gcGFzc2VzIHRoZSBnaXZlbiBhcmd1bWVudCB0byBEYXRlIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBhcmd1bWVudCAtIHRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gdGhlIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqIEBwYXJhbSB7MCB8IDEgfCAyfSBbb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzPTJdIC0gdGhlIGFkZGl0aW9uYWwgbnVtYmVyIG9mIGRpZ2l0cyBpbiB0aGUgZXh0ZW5kZWQgeWVhciBmb3JtYXRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHN0cmluZyAnMjAxNC0wMi0xMVQxMTozMDozMCcgdG8gZGF0ZTpcbiAqIHZhciByZXN1bHQgPSBwYXJzZSgnMjAxNC0wMi0xMVQxMTozMDozMCcpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBQYXJzZSBzdHJpbmcgJyswMjAxNDEwMScsXG4gKiAvLyBpZiB0aGUgYWRkaXRpb25hbCBudW1iZXIgb2YgZGlnaXRzIGluIHRoZSBleHRlbmRlZCB5ZWFyIGZvcm1hdCBpcyAxOlxuICogdmFyIHJlc3VsdCA9IHBhcnNlKCcrMDIwMTQxMDEnLCB7YWRkaXRpb25hbERpZ2l0czogMX0pXG4gKiAvLz0+IEZyaSBBcHIgMTEgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiBwYXJzZSAoYXJndW1lbnQsIGRpcnR5T3B0aW9ucykge1xuICBpZiAoaXNEYXRlKGFyZ3VtZW50KSkge1xuICAgIC8vIFByZXZlbnQgdGhlIGRhdGUgdG8gbG9zZSB0aGUgbWlsbGlzZWNvbmRzIHdoZW4gcGFzc2VkIHRvIG5ldyBEYXRlKCkgaW4gSUUxMFxuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudC5nZXRUaW1lKCkpXG4gIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50ICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudClcbiAgfVxuXG4gIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9XG4gIHZhciBhZGRpdGlvbmFsRGlnaXRzID0gb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzXG4gIGlmIChhZGRpdGlvbmFsRGlnaXRzID09IG51bGwpIHtcbiAgICBhZGRpdGlvbmFsRGlnaXRzID0gREVGQVVMVF9BRERJVElPTkFMX0RJR0lUU1xuICB9IGVsc2Uge1xuICAgIGFkZGl0aW9uYWxEaWdpdHMgPSBOdW1iZXIoYWRkaXRpb25hbERpZ2l0cylcbiAgfVxuXG4gIHZhciBkYXRlU3RyaW5ncyA9IHNwbGl0RGF0ZVN0cmluZyhhcmd1bWVudClcblxuICB2YXIgcGFyc2VZZWFyUmVzdWx0ID0gcGFyc2VZZWFyKGRhdGVTdHJpbmdzLmRhdGUsIGFkZGl0aW9uYWxEaWdpdHMpXG4gIHZhciB5ZWFyID0gcGFyc2VZZWFyUmVzdWx0LnllYXJcbiAgdmFyIHJlc3REYXRlU3RyaW5nID0gcGFyc2VZZWFyUmVzdWx0LnJlc3REYXRlU3RyaW5nXG5cbiAgdmFyIGRhdGUgPSBwYXJzZURhdGUocmVzdERhdGVTdHJpbmcsIHllYXIpXG5cbiAgaWYgKGRhdGUpIHtcbiAgICB2YXIgdGltZXN0YW1wID0gZGF0ZS5nZXRUaW1lKClcbiAgICB2YXIgdGltZSA9IDBcbiAgICB2YXIgb2Zmc2V0XG5cbiAgICBpZiAoZGF0ZVN0cmluZ3MudGltZSkge1xuICAgICAgdGltZSA9IHBhcnNlVGltZShkYXRlU3RyaW5ncy50aW1lKVxuICAgIH1cblxuICAgIGlmIChkYXRlU3RyaW5ncy50aW1lem9uZSkge1xuICAgICAgb2Zmc2V0ID0gcGFyc2VUaW1lem9uZShkYXRlU3RyaW5ncy50aW1lem9uZSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZ2V0IG9mZnNldCBhY2N1cmF0ZSB0byBob3VyIGluIHRpbWV6b25lcyB0aGF0IGNoYW5nZSBvZmZzZXRcbiAgICAgIG9mZnNldCA9IG5ldyBEYXRlKHRpbWVzdGFtcCArIHRpbWUpLmdldFRpbWV6b25lT2Zmc2V0KClcbiAgICAgIG9mZnNldCA9IG5ldyBEYXRlKHRpbWVzdGFtcCArIHRpbWUgKyBvZmZzZXQgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFKS5nZXRUaW1lem9uZU9mZnNldCgpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBEYXRlKHRpbWVzdGFtcCArIHRpbWUgKyBvZmZzZXQgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudClcbiAgfVxufVxuXG5mdW5jdGlvbiBzcGxpdERhdGVTdHJpbmcgKGRhdGVTdHJpbmcpIHtcbiAgdmFyIGRhdGVTdHJpbmdzID0ge31cbiAgdmFyIGFycmF5ID0gZGF0ZVN0cmluZy5zcGxpdChwYXJzZVRva2VuRGF0ZVRpbWVEZWxpbWV0ZXIpXG4gIHZhciB0aW1lU3RyaW5nXG5cbiAgaWYgKHBhcnNlVG9rZW5QbGFpblRpbWUudGVzdChhcnJheVswXSkpIHtcbiAgICBkYXRlU3RyaW5ncy5kYXRlID0gbnVsbFxuICAgIHRpbWVTdHJpbmcgPSBhcnJheVswXVxuICB9IGVsc2Uge1xuICAgIGRhdGVTdHJpbmdzLmRhdGUgPSBhcnJheVswXVxuICAgIHRpbWVTdHJpbmcgPSBhcnJheVsxXVxuICB9XG5cbiAgaWYgKHRpbWVTdHJpbmcpIHtcbiAgICB2YXIgdG9rZW4gPSBwYXJzZVRva2VuVGltZXpvbmUuZXhlYyh0aW1lU3RyaW5nKVxuICAgIGlmICh0b2tlbikge1xuICAgICAgZGF0ZVN0cmluZ3MudGltZSA9IHRpbWVTdHJpbmcucmVwbGFjZSh0b2tlblsxXSwgJycpXG4gICAgICBkYXRlU3RyaW5ncy50aW1lem9uZSA9IHRva2VuWzFdXG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGVTdHJpbmdzLnRpbWUgPSB0aW1lU3RyaW5nXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGVTdHJpbmdzXG59XG5cbmZ1bmN0aW9uIHBhcnNlWWVhciAoZGF0ZVN0cmluZywgYWRkaXRpb25hbERpZ2l0cykge1xuICB2YXIgcGFyc2VUb2tlbllZWSA9IHBhcnNlVG9rZW5zWVlZW2FkZGl0aW9uYWxEaWdpdHNdXG4gIHZhciBwYXJzZVRva2VuWVlZWVkgPSBwYXJzZVRva2Vuc1lZWVlZW2FkZGl0aW9uYWxEaWdpdHNdXG5cbiAgdmFyIHRva2VuXG5cbiAgLy8gWVlZWSBvciDCsVlZWVlZXG4gIHRva2VuID0gcGFyc2VUb2tlbllZWVkuZXhlYyhkYXRlU3RyaW5nKSB8fCBwYXJzZVRva2VuWVlZWVkuZXhlYyhkYXRlU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICB2YXIgeWVhclN0cmluZyA9IHRva2VuWzFdXG4gICAgcmV0dXJuIHtcbiAgICAgIHllYXI6IHBhcnNlSW50KHllYXJTdHJpbmcsIDEwKSxcbiAgICAgIHJlc3REYXRlU3RyaW5nOiBkYXRlU3RyaW5nLnNsaWNlKHllYXJTdHJpbmcubGVuZ3RoKVxuICAgIH1cbiAgfVxuXG4gIC8vIFlZIG9yIMKxWVlZXG4gIHRva2VuID0gcGFyc2VUb2tlbllZLmV4ZWMoZGF0ZVN0cmluZykgfHwgcGFyc2VUb2tlbllZWS5leGVjKGRhdGVTdHJpbmcpXG4gIGlmICh0b2tlbikge1xuICAgIHZhciBjZW50dXJ5U3RyaW5nID0gdG9rZW5bMV1cbiAgICByZXR1cm4ge1xuICAgICAgeWVhcjogcGFyc2VJbnQoY2VudHVyeVN0cmluZywgMTApICogMTAwLFxuICAgICAgcmVzdERhdGVTdHJpbmc6IGRhdGVTdHJpbmcuc2xpY2UoY2VudHVyeVN0cmluZy5sZW5ndGgpXG4gICAgfVxuICB9XG5cbiAgLy8gSW52YWxpZCBJU08tZm9ybWF0dGVkIHllYXJcbiAgcmV0dXJuIHtcbiAgICB5ZWFyOiBudWxsXG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VEYXRlIChkYXRlU3RyaW5nLCB5ZWFyKSB7XG4gIC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCB5ZWFyXG4gIGlmICh5ZWFyID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHZhciB0b2tlblxuICB2YXIgZGF0ZVxuICB2YXIgbW9udGhcbiAgdmFyIHdlZWtcblxuICAvLyBZWVlZXG4gIGlmIChkYXRlU3RyaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgIGRhdGUgPSBuZXcgRGF0ZSgwKVxuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeWVhcilcbiAgICByZXR1cm4gZGF0ZVxuICB9XG5cbiAgLy8gWVlZWS1NTVxuICB0b2tlbiA9IHBhcnNlVG9rZW5NTS5leGVjKGRhdGVTdHJpbmcpXG4gIGlmICh0b2tlbikge1xuICAgIGRhdGUgPSBuZXcgRGF0ZSgwKVxuICAgIG1vbnRoID0gcGFyc2VJbnQodG9rZW5bMV0sIDEwKSAtIDFcbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKHllYXIsIG1vbnRoKVxuICAgIHJldHVybiBkYXRlXG4gIH1cblxuICAvLyBZWVlZLURERCBvciBZWVlZREREXG4gIHRva2VuID0gcGFyc2VUb2tlbkRERC5leGVjKGRhdGVTdHJpbmcpXG4gIGlmICh0b2tlbikge1xuICAgIGRhdGUgPSBuZXcgRGF0ZSgwKVxuICAgIHZhciBkYXlPZlllYXIgPSBwYXJzZUludCh0b2tlblsxXSwgMTApXG4gICAgZGF0ZS5zZXRVVENGdWxsWWVhcih5ZWFyLCAwLCBkYXlPZlllYXIpXG4gICAgcmV0dXJuIGRhdGVcbiAgfVxuXG4gIC8vIFlZWVktTU0tREQgb3IgWVlZWU1NRERcbiAgdG9rZW4gPSBwYXJzZVRva2VuTU1ERC5leGVjKGRhdGVTdHJpbmcpXG4gIGlmICh0b2tlbikge1xuICAgIGRhdGUgPSBuZXcgRGF0ZSgwKVxuICAgIG1vbnRoID0gcGFyc2VJbnQodG9rZW5bMV0sIDEwKSAtIDFcbiAgICB2YXIgZGF5ID0gcGFyc2VJbnQodG9rZW5bMl0sIDEwKVxuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeWVhciwgbW9udGgsIGRheSlcbiAgICByZXR1cm4gZGF0ZVxuICB9XG5cbiAgLy8gWVlZWS1Xd3cgb3IgWVlZWVd3d1xuICB0b2tlbiA9IHBhcnNlVG9rZW5Xd3cuZXhlYyhkYXRlU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICB3ZWVrID0gcGFyc2VJbnQodG9rZW5bMV0sIDEwKSAtIDFcbiAgICByZXR1cm4gZGF5T2ZJU09ZZWFyKHllYXIsIHdlZWspXG4gIH1cblxuICAvLyBZWVlZLVd3dy1EIG9yIFlZWVlXd3dEXG4gIHRva2VuID0gcGFyc2VUb2tlbld3d0QuZXhlYyhkYXRlU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICB3ZWVrID0gcGFyc2VJbnQodG9rZW5bMV0sIDEwKSAtIDFcbiAgICB2YXIgZGF5T2ZXZWVrID0gcGFyc2VJbnQodG9rZW5bMl0sIDEwKSAtIDFcbiAgICByZXR1cm4gZGF5T2ZJU09ZZWFyKHllYXIsIHdlZWssIGRheU9mV2VlaylcbiAgfVxuXG4gIC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCBkYXRlXG4gIHJldHVybiBudWxsXG59XG5cbmZ1bmN0aW9uIHBhcnNlVGltZSAodGltZVN0cmluZykge1xuICB2YXIgdG9rZW5cbiAgdmFyIGhvdXJzXG4gIHZhciBtaW51dGVzXG5cbiAgLy8gaGhcbiAgdG9rZW4gPSBwYXJzZVRva2VuSEguZXhlYyh0aW1lU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICBob3VycyA9IHBhcnNlRmxvYXQodG9rZW5bMV0ucmVwbGFjZSgnLCcsICcuJykpXG4gICAgcmV0dXJuIChob3VycyAlIDI0KSAqIE1JTExJU0VDT05EU19JTl9IT1VSXG4gIH1cblxuICAvLyBoaDptbSBvciBoaG1tXG4gIHRva2VuID0gcGFyc2VUb2tlbkhITU0uZXhlYyh0aW1lU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICBob3VycyA9IHBhcnNlSW50KHRva2VuWzFdLCAxMClcbiAgICBtaW51dGVzID0gcGFyc2VGbG9hdCh0b2tlblsyXS5yZXBsYWNlKCcsJywgJy4nKSlcbiAgICByZXR1cm4gKGhvdXJzICUgMjQpICogTUlMTElTRUNPTkRTX0lOX0hPVVIgK1xuICAgICAgbWludXRlcyAqIE1JTExJU0VDT05EU19JTl9NSU5VVEVcbiAgfVxuXG4gIC8vIGhoOm1tOnNzIG9yIGhobW1zc1xuICB0b2tlbiA9IHBhcnNlVG9rZW5ISE1NU1MuZXhlYyh0aW1lU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICBob3VycyA9IHBhcnNlSW50KHRva2VuWzFdLCAxMClcbiAgICBtaW51dGVzID0gcGFyc2VJbnQodG9rZW5bMl0sIDEwKVxuICAgIHZhciBzZWNvbmRzID0gcGFyc2VGbG9hdCh0b2tlblszXS5yZXBsYWNlKCcsJywgJy4nKSlcbiAgICByZXR1cm4gKGhvdXJzICUgMjQpICogTUlMTElTRUNPTkRTX0lOX0hPVVIgK1xuICAgICAgbWludXRlcyAqIE1JTExJU0VDT05EU19JTl9NSU5VVEUgK1xuICAgICAgc2Vjb25kcyAqIDEwMDBcbiAgfVxuXG4gIC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCB0aW1lXG4gIHJldHVybiBudWxsXG59XG5cbmZ1bmN0aW9uIHBhcnNlVGltZXpvbmUgKHRpbWV6b25lU3RyaW5nKSB7XG4gIHZhciB0b2tlblxuICB2YXIgYWJzb2x1dGVPZmZzZXRcblxuICAvLyBaXG4gIHRva2VuID0gcGFyc2VUb2tlblRpbWV6b25lWi5leGVjKHRpbWV6b25lU3RyaW5nKVxuICBpZiAodG9rZW4pIHtcbiAgICByZXR1cm4gMFxuICB9XG5cbiAgLy8gwrFoaFxuICB0b2tlbiA9IHBhcnNlVG9rZW5UaW1lem9uZUhILmV4ZWModGltZXpvbmVTdHJpbmcpXG4gIGlmICh0b2tlbikge1xuICAgIGFic29sdXRlT2Zmc2V0ID0gcGFyc2VJbnQodG9rZW5bMl0sIDEwKSAqIDYwXG4gICAgcmV0dXJuICh0b2tlblsxXSA9PT0gJysnKSA/IC1hYnNvbHV0ZU9mZnNldCA6IGFic29sdXRlT2Zmc2V0XG4gIH1cblxuICAvLyDCsWhoOm1tIG9yIMKxaGhtbVxuICB0b2tlbiA9IHBhcnNlVG9rZW5UaW1lem9uZUhITU0uZXhlYyh0aW1lem9uZVN0cmluZylcbiAgaWYgKHRva2VuKSB7XG4gICAgYWJzb2x1dGVPZmZzZXQgPSBwYXJzZUludCh0b2tlblsyXSwgMTApICogNjAgKyBwYXJzZUludCh0b2tlblszXSwgMTApXG4gICAgcmV0dXJuICh0b2tlblsxXSA9PT0gJysnKSA/IC1hYnNvbHV0ZU9mZnNldCA6IGFic29sdXRlT2Zmc2V0XG4gIH1cblxuICByZXR1cm4gMFxufVxuXG5mdW5jdGlvbiBkYXlPZklTT1llYXIgKGlzb1llYXIsIHdlZWssIGRheSkge1xuICB3ZWVrID0gd2VlayB8fCAwXG4gIGRheSA9IGRheSB8fCAwXG4gIHZhciBkYXRlID0gbmV3IERhdGUoMClcbiAgZGF0ZS5zZXRVVENGdWxsWWVhcihpc29ZZWFyLCAwLCA0KVxuICB2YXIgZm91cnRoT2ZKYW51YXJ5RGF5ID0gZGF0ZS5nZXRVVENEYXkoKSB8fCA3XG4gIHZhciBkaWZmID0gd2VlayAqIDcgKyBkYXkgKyAxIC0gZm91cnRoT2ZKYW51YXJ5RGF5XG4gIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIGRpZmYpXG4gIHJldHVybiBkYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2VcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3BhcnNlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGRpZmZlcmVuY2VJbk1vbnRocyA9IHJlcXVpcmUoXCJkYXRlLWZucy9kaWZmZXJlbmNlX2luX21vbnRoc1wiKTtcbmNsYXNzIENvdW50ZG93biB7XG4gICAgLyoqXG4gICAgICogY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0RhdGV9IHN0YXJ0RGF0ZVxuICAgICAqIEBwYXJhbSB7RGF0ZX0gZW5kRGF0ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHN0YXJ0RGF0ZSA9IERhdGUubm93KCksIGVuZERhdGUpIHtcbiAgICAgICAgdGhpcy5EQVkgPSAyNCAqIDYwICogNjAgKiAxMDAwO1xuICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHN0YXJ0RGF0ZTtcbiAgICAgICAgdGhpcy5lbmREYXRlID0gRGF0ZS5wYXJzZShlbmREYXRlKTtcbiAgICB9XG4gICAgZ2V0T3JpZ2luTWlsbGlzZWNvbmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVuZERhdGUgLSB0aGlzLnN0YXJ0RGF0ZTtcbiAgICB9XG4gICAgZ2V0U2Vjb25kKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigodGhpcy5nZXRPcmlnaW5NaWxsaXNlY29uZCgpICUgdGhpcy5EQVkpIC8gMTAwMCkgJSA2MCAlIDYwO1xuICAgIH1cbiAgICBnZXRNaW51dGUoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCh0aGlzLmdldE9yaWdpbk1pbGxpc2Vjb25kKCkgJSB0aGlzLkRBWSkgLyAoNjAgKiAxMDAwKSkgJSA2MDtcbiAgICB9XG4gICAgZ2V0SG91cigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKHRoaXMuZ2V0T3JpZ2luTWlsbGlzZWNvbmQoKSAlIHRoaXMuREFZKSAvICg2MCAqIDYwICogMTAwMCkpO1xuICAgIH1cbiAgICBnZXREYXkoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuZ2V0T3JpZ2luTWlsbGlzZWNvbmQoKSAvIHRoaXMuREFZKTtcbiAgICB9XG4gICAgZ2V0V2VlaygpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5nZXREYXkoKSAlIDcpO1xuICAgIH1cbiAgICBnZXRPcmlnaW5Nb250aCgpIHtcbiAgICAgICAgY29uc3QgbW9udGggPSBkaWZmZXJlbmNlSW5Nb250aHMobmV3IERhdGUodGhpcy5lbmREYXRlKSwgbmV3IERhdGUodGhpcy5zdGFydERhdGUpKTtcbiAgICAgICAgcmV0dXJuIG1vbnRoO1xuICAgIH1cbiAgICBnZXRNb250aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0T3JpZ2luTW9udGgoKSAlIDEyO1xuICAgIH1cbiAgICBnZXRZZWFyKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmdldE1vbnRoKCkgLyAxMik7XG4gICAgfVxufVxuZXhwb3J0cy5Db3VudGRvd24gPSBDb3VudGRvd247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQ291bnRkb3duLnRzIiwidmFyIHBhcnNlID0gcmVxdWlyZSgnLi4vcGFyc2UvaW5kZXguanMnKVxudmFyIGRpZmZlcmVuY2VJbkNhbGVuZGFyTW9udGhzID0gcmVxdWlyZSgnLi4vZGlmZmVyZW5jZV9pbl9jYWxlbmRhcl9tb250aHMvaW5kZXguanMnKVxudmFyIGNvbXBhcmVBc2MgPSByZXF1aXJlKCcuLi9jb21wYXJlX2FzYy9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1vbnRoIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGZ1bGwgbW9udGhzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgZnVsbCBtb250aHMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGxhdGVyIGRhdGVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgZWFybGllciBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgbnVtYmVyIG9mIGZ1bGwgbW9udGhzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGZ1bGwgbW9udGhzIGFyZSBiZXR3ZWVuIDMxIEphbnVhcnkgMjAxNCBhbmQgMSBTZXB0ZW1iZXIgMjAxND9cbiAqIHZhciByZXN1bHQgPSBkaWZmZXJlbmNlSW5Nb250aHMoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDgsIDEpLFxuICogICBuZXcgRGF0ZSgyMDE0LCAwLCAzMSlcbiAqIClcbiAqIC8vPT4gN1xuICovXG5mdW5jdGlvbiBkaWZmZXJlbmNlSW5Nb250aHMgKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHZhciBkYXRlTGVmdCA9IHBhcnNlKGRpcnR5RGF0ZUxlZnQpXG4gIHZhciBkYXRlUmlnaHQgPSBwYXJzZShkaXJ0eURhdGVSaWdodClcblxuICB2YXIgc2lnbiA9IGNvbXBhcmVBc2MoZGF0ZUxlZnQsIGRhdGVSaWdodClcbiAgdmFyIGRpZmZlcmVuY2UgPSBNYXRoLmFicyhkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KSlcbiAgZGF0ZUxlZnQuc2V0TW9udGgoZGF0ZUxlZnQuZ2V0TW9udGgoKSAtIHNpZ24gKiBkaWZmZXJlbmNlKVxuXG4gIC8vIE1hdGguYWJzKGRpZmYgaW4gZnVsbCBtb250aHMgLSBkaWZmIGluIGNhbGVuZGFyIG1vbnRocykgPT09IDEgaWYgbGFzdCBjYWxlbmRhciBtb250aCBpcyBub3QgZnVsbFxuICAvLyBJZiBzbywgcmVzdWx0IG11c3QgYmUgZGVjcmVhc2VkIGJ5IDEgaW4gYWJzb2x1dGUgdmFsdWVcbiAgdmFyIGlzTGFzdE1vbnRoTm90RnVsbCA9IGNvbXBhcmVBc2MoZGF0ZUxlZnQsIGRhdGVSaWdodCkgPT09IC1zaWduXG4gIHJldHVybiBzaWduICogKGRpZmZlcmVuY2UgLSBpc0xhc3RNb250aE5vdEZ1bGwpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGlmZmVyZW5jZUluTW9udGhzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kYXRlLWZucy9kaWZmZXJlbmNlX2luX21vbnRocy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiLyoqXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBhcmd1bWVudCBhbiBpbnN0YW5jZSBvZiBEYXRlP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGFyZ3VtZW50IGFuIGluc3RhbmNlIG9mIERhdGU/XG4gKlxuICogQHBhcmFtIHsqfSBhcmd1bWVudCAtIHRoZSBhcmd1bWVudCB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBnaXZlbiBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElzICdtYXlvbm5haXNlJyBhIERhdGU/XG4gKiB2YXIgcmVzdWx0ID0gaXNEYXRlKCdtYXlvbm5haXNlJylcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlIChhcmd1bWVudCkge1xuICByZXR1cm4gYXJndW1lbnQgaW5zdGFuY2VvZiBEYXRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNEYXRlXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc19kYXRlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCJ2YXIgcGFyc2UgPSByZXF1aXJlKCcuLi9wYXJzZS9pbmRleC5qcycpXG5cbi8qKlxuICogQGNhdGVnb3J5IE1vbnRoIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIG1vbnRocyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIG1vbnRocyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBlYXJsaWVyIGRhdGVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgbW9udGhzXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGNhbGVuZGFyIG1vbnRocyBhcmUgYmV0d2VlbiAzMSBKYW51YXJ5IDIwMTQgYW5kIDEgU2VwdGVtYmVyIDIwMTQ/XG4gKiB2YXIgcmVzdWx0ID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDgsIDEpLFxuICogICBuZXcgRGF0ZSgyMDE0LCAwLCAzMSlcbiAqIClcbiAqIC8vPT4gOFxuICovXG5mdW5jdGlvbiBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIGRhdGVMZWZ0ID0gcGFyc2UoZGlydHlEYXRlTGVmdClcbiAgdmFyIGRhdGVSaWdodCA9IHBhcnNlKGRpcnR5RGF0ZVJpZ2h0KVxuXG4gIHZhciB5ZWFyRGlmZiA9IGRhdGVMZWZ0LmdldEZ1bGxZZWFyKCkgLSBkYXRlUmlnaHQuZ2V0RnVsbFllYXIoKVxuICB2YXIgbW9udGhEaWZmID0gZGF0ZUxlZnQuZ2V0TW9udGgoKSAtIGRhdGVSaWdodC5nZXRNb250aCgpXG5cbiAgcmV0dXJuIHllYXJEaWZmICogMTIgKyBtb250aERpZmZcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRoc1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZGlmZmVyZW5jZV9pbl9jYWxlbmRhcl9tb250aHMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsInZhciBwYXJzZSA9IHJlcXVpcmUoJy4uL3BhcnNlL2luZGV4LmpzJylcblxuLyoqXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbXBhcmUgdGhlIHR3byBkYXRlcyBhbmQgcmV0dXJuIC0xLCAwIG9yIDEuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb21wYXJlIHRoZSB0d28gZGF0ZXMgYW5kIHJldHVybiAxIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGFmdGVyIHRoZSBzZWNvbmQsXG4gKiAtMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBvciAwIGlmIGRhdGVzIGFyZSBlcXVhbC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgZmlyc3QgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIHNlY29uZCBkYXRlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSByZXN1bHQgb2YgdGhlIGNvbXBhcmlzb25cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29tcGFyZSAxMSBGZWJydWFyeSAxOTg3IGFuZCAxMCBKdWx5IDE5ODk6XG4gKiB2YXIgcmVzdWx0ID0gY29tcGFyZUFzYyhcbiAqICAgbmV3IERhdGUoMTk4NywgMSwgMTEpLFxuICogICBuZXcgRGF0ZSgxOTg5LCA2LCAxMClcbiAqIClcbiAqIC8vPT4gLTFcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU29ydCB0aGUgYXJyYXkgb2YgZGF0ZXM6XG4gKiB2YXIgcmVzdWx0ID0gW1xuICogICBuZXcgRGF0ZSgxOTk1LCA2LCAyKSxcbiAqICAgbmV3IERhdGUoMTk4NywgMSwgMTEpLFxuICogICBuZXcgRGF0ZSgxOTg5LCA2LCAxMClcbiAqIF0uc29ydChjb21wYXJlQXNjKVxuICogLy89PiBbXG4gKiAvLyAgIFdlZCBGZWIgMTEgMTk4NyAwMDowMDowMCxcbiAqIC8vICAgTW9uIEp1bCAxMCAxOTg5IDAwOjAwOjAwLFxuICogLy8gICBTdW4gSnVsIDAyIDE5OTUgMDA6MDA6MDBcbiAqIC8vIF1cbiAqL1xuZnVuY3Rpb24gY29tcGFyZUFzYyAoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgdmFyIGRhdGVMZWZ0ID0gcGFyc2UoZGlydHlEYXRlTGVmdClcbiAgdmFyIHRpbWVMZWZ0ID0gZGF0ZUxlZnQuZ2V0VGltZSgpXG4gIHZhciBkYXRlUmlnaHQgPSBwYXJzZShkaXJ0eURhdGVSaWdodClcbiAgdmFyIHRpbWVSaWdodCA9IGRhdGVSaWdodC5nZXRUaW1lKClcblxuICBpZiAodGltZUxlZnQgPCB0aW1lUmlnaHQpIHtcbiAgICByZXR1cm4gLTFcbiAgfSBlbHNlIGlmICh0aW1lTGVmdCA+IHRpbWVSaWdodCkge1xuICAgIHJldHVybiAxXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDBcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBhcmVBc2NcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2NvbXBhcmVfYXNjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiXSwic291cmNlUm9vdCI6IiJ9