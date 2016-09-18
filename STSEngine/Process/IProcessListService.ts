
module STSEngine {
    "use strict";

    export interface IProcessListService extends ICommitable, IFilterable<IProcess> {
        getProcessList(): IProcess[];
        createProcess(processType: ProcessType, attributeList?: Map<string, any> | IKeyValuePair[]): IProcess;
        removeFinished(): void;
    }
}