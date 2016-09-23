namespace STSEngine {

    export interface ICommitable {
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
    }
}