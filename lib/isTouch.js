(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Check Touch Device
     * @returns {boolean}
     */
    exports.isTouch = () => {
        const ua = navigator.userAgent;
        return (/Android|iPhone|iPod|iPad/.test(ua));
    };
});
