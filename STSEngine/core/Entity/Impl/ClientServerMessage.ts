namespace STSEngine {

    export class ClientServerMessage implements IClientServerMessage {
        messageType: number;
        attributeList: IKeyValuePair[];

        constructor(messageType: number, attributeList: IKeyValuePair[]) {
            this.messageType = messageType;
            this.attributeList = attributeList;
        }
    }
}