namespace STSEngine {

    export class ClientServerMessageResponseAuthentication extends ClientServerMessage {

        private _sid: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ClientServerMessageType.ResponseAuthentication);
        }

        public setSID(sid: string): void {
            this.attributeList.set(this._sid, sid);
        }

        public getSID(): string {
            return this.attributeList.get(this._sid);
        }
    }

    export module ClientServerMessageType {
        export const ResponseAuthentication = ClientServerMessageType.getNewTypeId();
    }
}