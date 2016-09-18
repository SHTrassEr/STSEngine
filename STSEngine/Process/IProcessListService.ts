
module STSEngine {
    "use strict";

    export interface IProcessListService extends ICommitable {
        getProcessList(): IProcess[];
        getNewProcessId(): number;
        addProcess(process: IProcess): void;

        getAll(condition: (item: IProcess) => boolean): IProcess[];
        getFirst(condition: (item: IProcess) => boolean): IProcess;
    }
}