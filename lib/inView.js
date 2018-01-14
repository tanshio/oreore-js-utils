/*! @preserve undefined v2.0.0 - tansio | MIT License */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.inView = factory());
}(this, (function () { 'use strict';

function polyfill(_ref) {
  var fills = _ref.fills,
      _ref$options = _ref.options,
      options = _ref$options === undefined ? '' : _ref$options,
      _ref$minify = _ref.minify,
      minify = _ref$minify === undefined ? true : _ref$minify,
      _ref$rum = _ref.rum,
      rum = _ref$rum === undefined ? true : _ref$rum,
      afterFill = _ref.afterFill;


  // contains list of all to be polyfilled features
  var needsPolyfill = [];

  // check if 'always' flag is set
  // if yes, no need to check for support since polyfills are loaded anyway
  if (options.indexOf('always') === -1) {

    if (fills !== undefined) {

      for (var i = 0; i < fills.length; i++) {
        var fill = fills[i];

        // set the fill against the window object
        var reducedFill = fill.indexOf('~') !== -1 ? window[fill.split('.')[0]] : fill.split('.').reduce(function (k, v) {
          return k[v];
        }, window);

        // check if window supports the fill
        if (reducedFill === undefined) {
          needsPolyfill.push(fill);
        }
      }

      // if no polyfills are needed, run callback
      if (needsPolyfill.length === 0) {
        return afterFill();
      }
    }
  } else {
    needsPolyfill = fills;
  }

  var min = minify ? '.min' : '';
  var features = fills ? 'features=' + needsPolyfill.join(',') : '';
  var flags = options ? '&flags=' + options.join(',') : '';
  var monitor = rum ? '\&rum=1' : ''; // not set to rum=0 since it loads scripts anyway

  var js = document.createElement('script');

  js.src = 'https://cdn.polyfill.io/v2/polyfill' + min + '.js?' + (features + flags + monitor);
  js.async = true;

  document.body.appendChild(js);

  js.onload = function () {
    return afterFill();
  };
  js.onerror = function () {
    return afterFill(new Error('Failed to load polyfill. Please write an issue here: https://github.com/PascalAOMS/dynamic-polyfill/issues', js.src));
  };
}

var dynamicPolyfill = polyfill;

var InView = /** @class */ (function () {
    function InView(selector) {
        this.selector = selector;
        console.log(this.selector);
    }
    InView.prototype.init = function () {
        var handler = this.scroll.bind(this);
        dynamicPolyfill({
            fills: ['IntersectionObserver'],
            options: ['gated'],
            minify: true,
            rum: false,
            afterFill: function () {
                handler();
            }
        });
    };
    InView.prototype.enter = function () {
        console.log('enter');
    };
    InView.prototype.leave = function () {
        console.log('leave');
    };
    InView.prototype.callback = function (entries) {
        console.log(entries);
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var e = entries_1[_i];
            if (e.isIntersecting) {
                console.log(e);
                this.enter();
            }
            else {
                this.leave();
            }
        }
    };
    InView.prototype.scroll = function () {
        var observer = new IntersectionObserver(this.callback.bind(this));
        var list = document.querySelectorAll(this.selector);
        if (list.length > 0) {
            Array.from(list).forEach(function (e) {
                observer.observe(e);
            });
        }
        else {
            console.log('no');
        }
    };
    return InView;
}());

return InView;

})));
