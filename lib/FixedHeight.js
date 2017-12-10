"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FitHeight {
    /**
     * @constractor
     * @param {string} selector
     */
    constructor(selector) {
        this.selector = selector;
        this.elements = Array.from(document.querySelectorAll(this.selector));
        this.eventListenerObject = this.changeHeight.bind(this);
    }
    init() {
        this.changeHeight();
        const ua = navigator.userAgent;
        if (/iPhone|iPod|iPad|Android/.test(ua)) {
            window.addEventListener('orientationchange', this.eventListenerObject);
        }
        else {
            window.addEventListener('resize', this.eventListenerObject);
        }
    }
    changeHeight() {
        this.elements.forEach((e) => {
            const minusSelector = e.getAttribute('data-height-minus');
            let minusPx = 0;
            if (minusSelector) {
                minusPx = this.getMinusPx(minusSelector);
            }
            e.style.height = `${window.innerHeight - minusPx}px`;
        });
    }
    remove() {
        console.log('remove');
        window.removeEventListener('resize', this.eventListenerObject);
    }
    /**
     * @param {string} selector
     * @returns {number}
     */
    getMinusPx(selector) {
        let minusPx = 0;
        let elem;
        elem = document.querySelector(selector);
        if (elem && elem.offsetHeight) {
            minusPx = elem.offsetHeight;
        }
        return minusPx;
    }
}
exports.FitHeight = FitHeight;
