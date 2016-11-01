namespace STSEngine {

    export interface IProcessListService extends IFilterable<IProcess> {

        init(objectList: Iterable<Iterable<[number, any]>>): void;
        getProcessList(): IProcess[];
        add(process: IProcess): void;
        removeFinished(): void;
        getIterator(): IterableIterator<IProcess>;
    }
}