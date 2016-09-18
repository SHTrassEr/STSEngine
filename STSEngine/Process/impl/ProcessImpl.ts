module STSEngine {
    "use strict";

    export class ProcessImpl implements IProcess {
        protected attributeList: IAttributeList;

        constructor(id: number, processType: ProcessType, attributeList?: Map<string, any> | IKeyValuePair[]) {
            this.attributeList = new AttributeListImpl();
            this.setId(id);
            this.setProcessType(processType);
            this.setProcessStatus(ProcessStatus.Init);

            if (attributeList) {
                this.setAttributeList(attributeList);
            }
        }

        public getId(): number {
            return this.getAttribute(AttributeType.Id);
        }

        protected setId(processId: number): void {
            this.setAttribute(AttributeType.Id, processId);
        }

        public getProcessType(): ProcessType {
            return this.getAttribute(AttributeType.ProcessType);
        }

        protected setProcessType(processType: ProcessType): void {
            this.setAttribute(AttributeType.ProcessType, processType);
        }

        public getProcessStatus(): ProcessStatus {
            return this.getAttribute(AttributeType.ProcessStatus);
        }

        public setProcessStatus(processStatus: ProcessStatus): void {
            this.setAttribute(AttributeType.ProcessStatus, processStatus);
        }

        public getObjectId(): number {
            return this.getAttribute(AttributeType.ObjectId);
        }

        public setObjectId(objectId: number): void {
            this.setAttribute(AttributeType.ObjectId, objectId);
        }

        //IAttributeList

        public getAttribute(attribute: string, defaultValue?: any): any {
            return this.attributeList.getAttribute(attribute, defaultValue);
        }

        public setAttribute(attribute: string, value: any): void {
            this.attributeList.setAttribute(attribute, value);
        }

        public setAttributeList(attributeList: Map<string, any> | IKeyValuePair[]): void {
            this.attributeList.setAttributeList(attributeList);
        }

        public hasAttribute(attribute: string): boolean {
            return this.attributeList.hasAttribute(attribute);
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

        public removeAttribute(attribute: string): void {
            this.attributeList.removeAttribute(attribute);
        }
    }

}