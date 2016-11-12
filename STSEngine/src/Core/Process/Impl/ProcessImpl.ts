namespace STSEngine {

    export class ProcessImpl implements IProcess {

        protected attributeList: IAttributeList;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            if (attributeList) {
                this.attributeList = attributeList;
            } else {
                this.attributeList = new AttributeList();
            }

            if (kvpList) {
                this.attributeList.setList(kvpList);
            }

            this.setProcessStatus(ProcessStatus.Init);
        }

        public getId(): number {
            return this.attributeList.get(ProcessAttributeType.Id);
        }

        public setId(id: number): void {
            this.attributeList.set(ProcessAttributeType.Id, id);
        }

        public getProcessType(): number {
            return this.attributeList.get(ProcessAttributeType.Type);
        }

        public setProcessType(processType: number): void {
            this.attributeList.set(ProcessAttributeType.Type, processType);
        }

        public getProcessStatus(): ProcessStatus {
            return this.attributeList.get(ProcessAttributeType.Status);
        }

        public setProcessStatus(processStatus: ProcessStatus): void {
            this.attributeList.set(ProcessAttributeType.Status, processStatus);
        }

        public getProcessExecCount(): number {
            return this.attributeList.get(ProcessAttributeType.ExecCount, 0);
        }

        public setProcessExecCount(execCount: number): void {
            this.attributeList.set(ProcessAttributeType.ExecCount, execCount);
        }

        public getList(): [number, any][] {
            return this.attributeList.getList();
        }

        [Symbol.iterator]
        public getIterator(): IterableIterator<[number, any]> {
            return this.attributeList.getIterator();
        }

        public getAttributeList(): IAttributeList {
            return this.attributeList;
        }
    }
}