declare class InView {
    private selector;
    constructor(selector: any);
    init(): void;
    enter(): void;
    leave(): void;
    callback(entries: any): void;
    scroll(): void;
}
export default InView;
