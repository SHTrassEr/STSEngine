
module STSEngine {
    "use strict";

    export interface IProcessListService extends ICommitable {

        getProcessList(): IProcess[];
        addProcess(process: IProcess): void;

    }

}