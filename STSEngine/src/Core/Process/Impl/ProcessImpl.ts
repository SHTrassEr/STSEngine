namespace STSEngine {

    export class ProcessImpl implements IProcess {

        protected attributeList: ICommitableAttributeList;

        constructor(attributeList: IKeyValuePair[]) {
            this.attributeList = new AttributeListCommitable();
            this.setProcessStatus(ProcessStatus.Init);

            if (attributeList) {
                this.setList(attributeList);
            }
        }

        public getId(): number {
            return this.get(AttributeType.Id);
        }

        protected setId(processId: number): void {
            this.set(AttributeType.Id, processId);
        }

        public getProcessType(): ProcessType {
            return this.get(AttributeType.ProcessType);
        }

        protected setProcessType(processType: ProcessType): void {
            this.set(AttributeType.ProcessType, processType);
        }

        public getProcessStatus(): ProcessStatus {
            return this.get(AttributeType.ProcessStatus);
        }

        public setProcessStatus(processStatus: ProcessStatus): void {
            this.set(AttributeType.ProcessStatus, processStatus);
        }

        public getObjectId(): number {
            return this.get(AttributeType.ObjectId);
        }

        public setObjectId(objectId: number): void {
            this.set(AttributeType.ObjectId, objectId);
        }

        //IAttributeList

        public get(attribute: string, defaultValue?: any): any {
            return this.attributeList.get(attribute, defaultValue);
        }

        public set(attribute: string, value: any): void {
            this.attributeList.set(attribute, value);
        }

        public setList(attributeList: Map<string, any> | IKeyValuePair[]): void {
            this.attributeList.setList(attributeList);
        }

        public has(attribute: string): boolean {
            return this.attributeList.has(attribute);
        }

        public rollback(): void {
            this.attributeList.rollback();
        }

        public commit(): void {
            this.attributeList.commit();
        }

        public isDirty(): boolean {
            return this.attributeList.isDirty();
        }

        public delete(attribute: string): void {
            this.attributeList.delete(attribute);
        }

        public getKeyValuePairList(): IKeyValuePair[] {
            return this.attributeList.getKeyValuePairList();
        }
    }

}