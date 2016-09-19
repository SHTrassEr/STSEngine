namespace STSEngine {
    "use strict";

    export interface ICommitRollback {
        commit(): void;
        rollback(): void;
        isDurty(): boolean;
    }
}