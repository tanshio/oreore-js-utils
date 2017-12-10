"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const differenceInMonths = require("date-fns/difference_in_months");
class Countdown {
    /**
     * constructor
     * @param {Date} startDate
     * @param {Date} endDate
     */
    constructor(startDate = Date.now(), endDate) {
        this.DAY = 24 * 60 * 60 * 1000;
        this.startDate = startDate;
        this.endDate = Date.parse(endDate);
    }
    getOriginMillisecond() {
        return this.endDate - this.startDate;
    }
    getSecond() {
        return Math.floor((this.getOriginMillisecond() % this.DAY) / 1000) % 60 % 60;
    }
    getMinute() {
        return Math.floor((this.getOriginMillisecond() % this.DAY) / (60 * 1000)) % 60;
    }
    getHour() {
        return Math.floor((this.getOriginMillisecond() % this.DAY) / (60 * 60 * 1000));
    }
    getDay() {
        return Math.floor(this.getOriginMillisecond() / this.DAY);
    }
    getWeek() {
        return Math.floor(this.getDay() % 7);
    }
    getOriginMonth() {
        const month = differenceInMonths(new Date(this.endDate), new Date(this.startDate));
        return month;
    }
    getMonth() {
        return this.getOriginMonth() % 12;
    }
    getYear() {
        return Math.floor(this.getMonth() / 12);
    }
}
exports.Countdown = Countdown;
