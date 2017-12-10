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
