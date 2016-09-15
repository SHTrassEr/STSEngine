module STSEngine {
    "use strict";

    export interface IFilterProcessListService {
        filterProcessList(state: IObject, f: (state: IObject, process: IProcess) => boolean): IProcess[];
    }
}