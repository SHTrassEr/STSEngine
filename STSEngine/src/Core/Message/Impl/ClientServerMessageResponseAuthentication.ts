/// <reference path="ClientServerMessage.ts" />

namespace STSEngine {

    export class ClientServerMessageResponseAuthentication extends ClientServerMessage {

        private _sid: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ClientServerMessageResponseAuthentication.Type);
        }

        public setSID(sid: string): void {
            this.attributeList.set(this._sid, sid);
        }

        public getSID(): string {
            return this.attributeList.get(this._sid);
        }
    }

    export module ClientServerMessageResponseAuthentication {
        export const Type = ++ClientServerMessage.LastTypeId;
    }
}