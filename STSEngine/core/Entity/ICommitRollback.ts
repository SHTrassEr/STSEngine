namespace STSEngine {

    export interface ICommitRollback {
        commit(): void;
        rollback(): void;
        isDurty(): boolean;
    }
}