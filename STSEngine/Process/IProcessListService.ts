
namespace STSEngine {
    "use strict";

    export interface IProcessListService extends ICommitable, IFilterable<IProcess> {
        getProcessList(): IProcess[];
        createProcess(processType: IKeyValuePair[]): IProcess;
        removeFinished(): void;
    }
}