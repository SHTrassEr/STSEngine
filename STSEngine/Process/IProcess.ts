module STSEngine {
    "use strict";

    export interface IProcess {
        getId(): number;
        step(): void;
        getStatus(): ProcessStatus;
        init(): void;
        finish(): void;
    }
}