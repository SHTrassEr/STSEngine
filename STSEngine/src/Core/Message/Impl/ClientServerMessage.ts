namespace STSEngine {

    export class ClientServerMessage implements IClientServerMessage {
        public messageType: number;
        public attributeList: [number, any][];

        constructor(messageType: number, attributeList: [number, any][]) {
            this.messageType = messageType;
            this.attributeList = attributeList;
        }
    }
}