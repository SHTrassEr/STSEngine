namespace STSEngine.Example {

    export class ProcessFire extends STSEngine.ProcessImpl {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setProcessType(ProcessType.Fire);
        }

        public getObjectId(): number {
            return this.attributeList.get(ProcessAttributeType.ObjectId);
        }

        public setObjectId(id: number): void {
            this.attributeList.set(ProcessAttributeType.ObjectId, id);
        }

    }
}