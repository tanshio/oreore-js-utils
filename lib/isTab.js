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
