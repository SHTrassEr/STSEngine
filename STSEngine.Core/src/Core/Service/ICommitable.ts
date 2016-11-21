namespace STSEngine.Core {

    export interface ICommitable {
        commit(): void;
        rollback(): void;
        isDirty(): boolean;
    }
}