namespace STSEngine {

    export interface IProcessListService extends ICommitable, IFilterable<IProcess> {
        getProcessList(): IProcess[];
        createProcess(processType: IKeyValuePair[]): IProcess;
        setProcessList(processList: IKeyValuePair[][]): void;
        removeFinished(): void;
    }
}