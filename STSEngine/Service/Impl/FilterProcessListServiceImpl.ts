
module STSEngine {
    "use strict";

    export class FilterProcessListServiceImpl implements IFilterProcessListService {

        public filterProcessList(state: IObject, isValid: (state: IObject, process: IProcess) => boolean): IProcess[] {
            var processList: IProcess[] = [];
            var filteredProcesssList: IProcess[] = [];
            for (var p of processList) {
                if (isValid(state, p)) {
                    filteredProcesssList.push(p);
                }
            }

            return filteredProcesssList;
        }

    }
}