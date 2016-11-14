namespace STSEngine {

    export class ClientServerMessageResponseAuthentication extends ClientServerMessage {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ClientServerMessageType.ResponseAuthentication);
        }

        public setSID(sid: string): void {
            this.attributeList.set(ClientServerMessageAttributeType.SID, sid);
        }

        public getSID(): string {
            return this.attributeList.get(ClientServerMessageAttributeType.SID);
        }
    }
}