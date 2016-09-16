
module STSEngine {
    "use strict";

    export interface IProcessListService extends ICommitable {

        getProcessList(): IProcess[];
        getNewProcessId(): number;
        addProcess(process: IProcess): void;

    }

}