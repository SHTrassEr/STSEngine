namespace STSEngine {

    export class ProcessListService implements IProcessListService {
        protected commitedLastId: number;
        protected commitedProcessList: IProcess[];
        protected lastId: number;
        protected processList: IProcess[];
        protected filterService: IFilterService<IProcess>;

        constructor() {
            this.commitedProcessList = [];
            this.processList = [];
            this.filterService = new FilterService<IProcess>();
            this.setLastId(0);
        }

        public getProcessList(): IProcess[] {
            return this.processList;
        }

        protected addProcess(process: IProcess): void {
            this.processList.push(process);
        }

        public createProcess(attributeList: IKeyValuePair[]): IProcess {
            attributeList.push(new KeyValuePair(AttributeType.Id, this.getNewProcessId()));
            let process = new ProcessImpl(attributeList);
            this.addProcess(process);
            return process;
        }

        public setProcessList(processList: IKeyValuePair[][]): void {
            for (let attributeList of processList) {
                this.createProcess(attributeList);
            }
        }

        protected getNewProcessId(): number {
            let lastObjectId = this.getLastId();
            let newObjectId = lastObjectId + 1;
            this.setLastId(newObjectId);
            return newObjectId;
        }

        protected getLastId(): number {
            return this.lastId;
        }

        protected setLastId(id: number): void {
            this.lastId = id;
        }

        public removeFinished(): void {
            let list: IProcess[];
            for (let process of this.processList) {
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
            this.commitedLastId = this.lastId;
            for (let process of this.processList) {
                process.commit();
            }
        }

        public rollback(): void {
            for (let process of this.processList) {
                process.rollback();
            }

            this.processList = this.commitedProcessList.slice();
            this.lastId = this.commitedLastId;
        }

        public isDirty(): boolean {
            if (this.processList.length > this.commitedProcessList.length) {
                return true;
            }

            if (this.lastId != this.commitedLastId) {
                return true;
            }

            for (let process of this.processList) {
                if (process.isDirty()) {
                    return true;
                }
            }

            return false;
        }

        public getAll(condition: (item: IProcess) => boolean): IterableIterator<IProcess> {
            return this.filterService.getAll(this.processList, condition);
        }

        public getFirst(condition: (item: IProcess) => boolean): IProcess {
            return this.filterService.getFirst(this.processList, condition);
        }
    }
}