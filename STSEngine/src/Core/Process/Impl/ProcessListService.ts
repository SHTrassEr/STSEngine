namespace STSEngine {

    export class ProcessListService implements IProcessListService {
        protected processList: IProcess[];
        protected filterService: IFilterService<IProcess>;

        constructor() {
            this.processList = [];
            this.filterService = new FilterService<IProcess>();
        }

        public init(processList: Iterable<IProcess>): void {
            this.processList = [];
            for (let p of processList) {
                this.add(p);
            }
        }

        public getProcessList(): IProcess[] {
            return this.processList;
        }

        public add(process: IProcess): void {
            this.processList.push(process);
        }

        public removeFinished(): void {
            let list: IProcess[];
            for (let i = this.processList.length - 1; i >= 0; i--) {
                let process = this.processList[i];
                if (process.getProcessStatus() == ProcessStatus.Finished) {
                    this.processList.splice(i, 1);
                }
            }
        }

        public getIterator(): IterableIterator<IProcess> {
            return this.processList.values();
        }

        public getAll(condition: (item: IProcess) => boolean): IterableIterator<IProcess> {
            return this.filterService.getAll(this.processList.values(), condition);
        }

        public getFirst(condition: (item: IProcess) => boolean): IProcess {
            return this.filterService.getFirst(this.processList.values(), condition);
        }
    }
}