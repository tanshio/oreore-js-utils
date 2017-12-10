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
     * Check Tablet Device
     * @returns {boolean}
     */
    exports.isTab = () => {
        const ua = navigator.userAgent;
        return (ua.indexOf('iPad') > 0 || (ua.indexOf('Android') > 0) && (ua.indexOf('Mobile') === -1));
    };
});
