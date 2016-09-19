namespace STSEngine {
    "use strict";

    export interface ICommitable {
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
    }
}