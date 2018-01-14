export declare class FitHeight {
    private selector;
    private elements;
    private eventListenerObject;
    /**
     * @constractor
     * @param {string} selector
     */
    constructor(selector: string);
    init(): void;
    changeHeight(): void;
    remove(): void;
    /**
     * @param {string} selector
     * @returns {number}
     */
    protected getMinusPx(selector: string): number;
}
