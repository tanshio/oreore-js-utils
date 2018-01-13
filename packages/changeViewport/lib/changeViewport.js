(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./isMobile"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const isMobile_1 = require("./isMobile");
    /**
     * [description]
     * @param  {Number} [size=1024] [description]
     */
    exports.changeViewport = (size = 1024) => {
        const _viewport = document.createElement('meta');
        const $head = document.querySelector('head');
        _viewport.setAttribute('name', 'viewport');
        if (isMobile_1.isMobile()) {
            _viewport.setAttribute('content', 'width=device-width, initial-scale=1');
        }
        else {
            _viewport.setAttribute('content', `width=${size}`);
        }
        if ($head) {
            $head.appendChild(_viewport);
        }
    };
});
