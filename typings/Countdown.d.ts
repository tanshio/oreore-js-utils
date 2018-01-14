export declare class Countdown {
    startDate: number;
    endDate: number;
    private DAY;
    /**
     * constructor
     * @param {Date} startDate
     * @param {Date} endDate
     */
    constructor(startDate: number | undefined, endDate: string);
    getOriginMillisecond(): number;
    getSecond(): number;
    getMinute(): number;
    getHour(): number;
    getDay(): number;
    getWeek(): number;
    getOriginMonth(): number;
    getMonth(): number;
    getYear(): number;
}
