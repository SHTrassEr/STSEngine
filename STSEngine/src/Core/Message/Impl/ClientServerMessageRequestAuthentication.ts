namespace STSEngine {

    export class ClientServerMessageRequestAuthentication extends ClientServerMessage {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ClientServerMessageType.RequestAuthentication);
        }
    }
}