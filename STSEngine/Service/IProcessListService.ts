
module STSEngine {
    "use strict";

    export interface IProcessListService {

        getProcessList(): IProcess[];
        addProcess(process: IProcess): void;

    }

}