﻿namespace STSEngine.Core {

    export interface IProcessListService extends IFilterable<IProcess> {

        init(objectList: Iterable<Iterable<[number, any]>>): void;
        getProcessList(): IProcess[];
        add(process: IProcess): void;
        removeFinished(): void;
        clear(): void;
        getIterator(): IterableIterator<IProcess>;
        getList(): [number, any][][];
        setList(object: Iterable<IProcess>, clear?: boolean): void;
    }
}