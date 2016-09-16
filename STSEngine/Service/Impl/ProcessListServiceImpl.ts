module STSEngine {
    "use strict";

    export class ProcessListServiceImpl implements IProcessListService {
        protected commitedProcessList: IProcess[];
        protected processList: IProcess[];

        constructor() {
            this.commitedProcessList = [];
            this.processList = [];
        }

        public getProcessList(): IProcess[] {
            return this.processList;
        }

        public addProcess(process: IProcess): void {
            this.processList.push(process);
        }

        public commit(): void {
            this.commitedProcessList = this.processList;
            for (var process of this.processList) {
                process.commit();
            }
        }

        public rollback(): void {
            for (var process of this.processList) {
                process.rollback();
            }

            this.processList = this.commitedProcessList;
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
    }
}