namespace STSEngine {

    export class ClientServerMessageCommandList extends ClientServerMessage {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ClientServerMessageType.CommandList);
        }

        public setCommandList(commandList: [number, any][][]): void {
            this.attributeList.set(ClientServerMessageAttributeType.CommandList, commandList);
        }

        public getCommandList(): [number, any][][] {
            return this.attributeList.get(ClientServerMessageAttributeType.CommandList);
        }
    }
}