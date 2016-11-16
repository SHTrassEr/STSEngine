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
                if (process.getStatus() == ProcessStatus.Finished) {
                    this.processList.splice(i, 1);
                }
            }
        }

        public clear() {
            this.processList = [];
        }

        public * getIterator(): IterableIterator<IProcess> {
            for (let process of this.processList) {
                yield process;
            }
        }

        public getList(): [number, any][][] {
            let iterator = this.getIterator();
            let list: [number, any][][] = [];
            for (let entity of iterator) {
                list.push(entity.getList());
            }

            return list;
        }

        public setList(entityList: Iterable<IProcess>, clear?: boolean): void {
            if (clear) {
                this.clear();
            }

            for (let entity of entityList) {
                this.add(entity);
            }
        }

        public getAll(condition: (item: IProcess) => boolean): IterableIterator<IProcess> {
            return this.filterService.getAll(this.processList, condition);
        }

        public getFirst(condition: (item: IProcess) => boolean): IProcess {
            return this.filterService.getFirst(this.processList, condition);
        }
    }
}