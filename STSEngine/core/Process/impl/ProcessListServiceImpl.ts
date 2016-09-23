namespace STSEngine {

    export class ProcessListServiceImpl implements IProcessListService {
        protected commitedProcessList: IProcess[];
        protected processList: IProcess[];
        protected filterService: IFilterService<IProcess>;

        protected attributeList: IAttributeList;

        constructor() {
            this.commitedProcessList = [];
            this.processList = [];
            this.attributeList = new STSEngine.AttributeListImpl();
            this.filterService = new FilterServiceImpl<IProcess>();
            this.setLastId(0);
        }

        public getProcessList(): IProcess[] {
            return this.processList;
        }

        protected addProcess(process: IProcess): void {
            this.processList.push(process);
        }

        public createProcess(attributeList: IKeyValuePair[]): IProcess {
            attributeList.push(new KeyValuePairImpl(AttributeType.Id, this.getNewProcessId()));
            var process = new ProcessImpl(attributeList);
            this.addProcess(process);
            return process;
        }

        public setProcessList(processList: IKeyValuePair[][]): void {
            for (var attributeList of processList) {
                this.createProcess(attributeList);
            }
        }

        protected getNewProcessId(): number {
            var lastObjectId = this.getLastId();
            var newObjectId = lastObjectId + 1;
            this.setLastId(newObjectId);
            return newObjectId;
        }

        protected getLastId(): number {
            return this.attributeList.getAttribute(ServiceAttributeType.LastId);
        }

        protected setLastId(id: number): void {
            this.attributeList.setAttribute(ServiceAttributeType.LastId, 0);
        }

        public removeFinished(): void {
            var list: IProcess[];
            for (var process of this.processList) {
                if (process.getProcessStatus() != ProcessStatus.Finished) {
                    if (!list) {
                        list = [];
                    }
                    list.push(process);
                }
            }

            if (list) {
                this.processList = list;
            }
        }

        public commit(): void {
            this.commitedProcessList = this.processList.slice();
            for (var process of this.processList) {
                process.commit();
            }
        }

        public rollback(): void {
            for (var process of this.processList) {
                process.rollback();
            }

            this.processList = this.commitedProcessList.slice();
        }

        public isDirty(): boolean {
            if (this.processList.length > this.commitedProcessList.length) {
                return true;
            }

            for (var process of this.processList) {
                if (process.isDirty()) {
                    return true;
                }
            }

            return false;
        }

        public getAll(condition: (item: IProcess) => boolean): IProcess[] {
            return this.filterService.getAll(this.processList, condition);
        }

        public getFirst(condition: (item: IProcess) => boolean): IProcess {
            return this.filterService.getFirst(this.processList, condition);
        }
    }
}