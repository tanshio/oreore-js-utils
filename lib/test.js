'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const FixedHeight_1 = require("./FixedHeight");
const changeViewport_1 = require("./changeViewport");
const jquery_instagram_1 = require("./jquery-instagram");
// import { countDown } from './Countdown'
// import { debounce } from 'lodash-es/debounce'
const throttle_1 = require("./throttle");
const polyfill = require("dynamic-polyfill");
polyfill({
    fills: ['IntersectionObserver'],
    options: ['gated'],
    minify: true,
    rum: false,
    afterFill() {
        console.log('loads');
        // callback
    }
});
window.addEventListener('scroll', throttle_1.throttle(function () {
    console.log('test2');
}, 200));
// let count = new countDwon(
//   Date.now(),
//   '2019-11-27 00:00:00'
// )
// function c () {
//   count.startDate = Date.now()
//   console.log(`${count.getMonth()} ${count.getHour()} ${count.getMinute()} ${count.getSecond()}`)
//   setTimeout(c, 1000)
// }
//
// c()
// const throttle = require('throttle-debounce/throttle')
// const debounce = require('throttle-debounce/debounce')
//
// import * as throttle from 'throttle-debounce/throttle';
// import throttle = require('throttle-debounce/throttle')
//
// //
// throttle(300, function () {
//   console.log('test')
// })
//
// debounce(300, function () {
//   // Debounced function
// })
const test = () => {
    const arr = [1, 2, 3, 4, 5];
    console.log('test');
    console.log([...arr]);
    const fitHeight = new FixedHeight_1.FitHeight('.js-height');
    fitHeight.init();
    const button = document.querySelector('.js-heightStop');
    if (button) {
        button.addEventListener('click', () => {
            fitHeight.remove();
        });
    }
};
test();
changeViewport_1.changeViewport();
jquery_instagram_1.instagram();
const timer = () => {
    return new Promise((resolve) => {
        setTimeout(function () {
            console.log('hello');
            resolve();
        }, 1000);
    });
};
timer().then(() => {
    console.log('resolve');
});
async function timer2() {
    return new Promise((resolve) => {
        setTimeout(function () {
            console.log('hello-async');
            resolve();
        }, 1000);
    });
}
const call = async () => {
    await timer2();
    console.log('hello-end');
};
call().then(() => {
    console.log('async-complete');
});
function func(num) {
    console.log(num);
}
func(2);
