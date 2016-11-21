namespace STSEngine.Core {

    export class ProcessListServiceCommitable implements IProcessListService, ICommitable {
        protected processList: IProcess[];
        protected filterService: IFilterService<IProcess>;
        protected firstUncommitedIndex: number;

        constructor() {
            this.processList = [];
            this.filterService = new FilterService<IProcess>();
            this.firstUncommitedIndex = 0;
        }

        public getProcessList(): IProcess[] {
            return this.processList;
        }

        public add(process: IProcess): void {
            this.processList.push(process);
        }


        public init(processList: Iterable<IProcess>): void {
            this.processList = [];
            for (let p of processList) {
                this.add(p);
            }
        }

        public removeFinished(): void {
            let list: IProcess[];
            for (let i = this.firstUncommitedIndex - 1; i >= 0; i--) {
                let process = this.processList[i];
                if (process.getStatus() == ProcessStatus.Finished) {
                    this.processList.splice(i, 1);
                    this.firstUncommitedIndex--;
                }
            }
        }


        public clear(): void {
            this.processList = [];
            this.firstUncommitedIndex = 0;
        }

        public getIterator(): IterableIterator<IProcess> {
            return this.processList.values();
        }

        public getList(): [number, any][][] {
            let iterator = this.getIterator();
            let list: [number, any][][] = [];
            for (let entity of iterator) {
                list.push(entity.getList());
            }

            return list;
        }

        public setList(processList: Iterable<IProcess>, clear?: boolean): void {
            if (clear) {
                this.clear();
            }

            for (let entity of processList) {
                this.add(entity);
            }
        }

        public commit(): void {
            for (let process of this.processList) {
                process.getAttributeList().commit();
            }

            this.firstUncommitedIndex = this.processList.length;
        }

        public rollback(): void {
            if (this.processList.length > this.firstUncommitedIndex) {
                this.processList.splice(this.firstUncommitedIndex);
            }

            for (let process of this.processList) {
                process.getAttributeList().rollback();
            }
        }

        public isDirty(): boolean {
            if (this.processList.length > this.firstUncommitedIndex) {
                return true;
            }

            for (let process of this.processList) {
                if (process.getAttributeList().isDirty()) {
                    return true;
                }
            }

            return false;
        }

        public getAll(condition: (item: IProcess) => boolean): IterableIterator<IProcess> {
            return this.filterService.getAll(this.processList.values(), condition);
        }

        public getFirst(condition: (item: IProcess) => boolean): IProcess {
            return this.filterService.getFirst(this.processList.values(), condition);
        }
    }
}