module STSEngine {
    "use strict";

    export class ProcessListServiceImpl implements IProcessListService {
        protected commitedProcessList: IProcess[];
        protected processList: IProcess[];

        protected attributeList: IAttributeList;

        constructor() {
            this.commitedProcessList = [];
            this.processList = [];
            this.attributeList = new STSEngine.AttributeListImpl();
            this.setLastId(0);
        }

        public getProcessList(): IProcess[] {
            return this.processList;
        }

        public addProcess(process: IProcess): void {
            this.processList.push(process);
            process.init();
        }

        public getNewProcessId(): number {
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