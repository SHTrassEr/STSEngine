
module STSEngine {
    "use strict";

    export interface IProcessListService extends ICommitable {
        getProcessList(): IProcess[];
        createProcess(processType: ProcessType, attributeList?: Map<string, any> | IKeyValuePair[]): IProcess;

        getAll(condition: (item: IProcess) => boolean): IProcess[];
        getFirst(condition: (item: IProcess) => boolean): IProcess;
    }
}