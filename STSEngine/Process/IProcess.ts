module STSEngine {
    "use strict";

    export interface IProcess extends IAttributeList {
        getId(): number;
        step(): void;
        getStatus(): ProcessStatus;
        init(): void;
        finish(): void;
    }
}