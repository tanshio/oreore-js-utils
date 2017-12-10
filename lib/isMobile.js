"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Check Mobile Device
 * @returns {boolean}
 */
exports.isMobile = () => {
    const ua = navigator.userAgent;
    return (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0) && (ua.indexOf('Mobile') > 0) || ua.indexOf('Windows Phone') > 0);
};
