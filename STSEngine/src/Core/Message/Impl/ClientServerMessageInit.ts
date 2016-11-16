/// <reference path="ClientServerMessage.ts" />

namespace STSEngine {

    export class ClientServerMessageInit extends ClientServerMessage {

        private _clientId: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ClientServerMessageInit.Type);
        }

        public setClientId(clientId: number): void {
            this.attributeList.set(this._clientId, clientId);
        }

        public getClientId(): number {
            return this.attributeList.get(this._clientId);
        }
    }

    export module ClientServerMessageInit {
        export const Type = ++ClientServerMessage.LastTypeId;
    }
}