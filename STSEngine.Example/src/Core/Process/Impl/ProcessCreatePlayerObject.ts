namespace STSEngine.Example {

    export class ProcessCreatePlayerObject extends STSEngine.ProcessImpl {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setProcessType(ProcessType.CreatePlayerObject);
        }

        public getPlayerId(): number {
            return this.attributeList.get(ProcessAttributeType.PlayerId);
        }

        public setPlayerId(id: number): void {
            this.attributeList.set(ProcessAttributeType.PlayerId, id);
        }
    }
}