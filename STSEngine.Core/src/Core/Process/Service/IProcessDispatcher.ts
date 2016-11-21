namespace STSEngine.Core {

    export interface IProcessDispatcher {
        init(process: IProcess): void;
        execute(process: IProcess): void;
        finish(process: IProcess): void;
    }

}