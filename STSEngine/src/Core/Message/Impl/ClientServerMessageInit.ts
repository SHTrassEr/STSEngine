/// <reference path="ClientServerMessage.ts" />

namespace STSEngine {

    export class ClientServerMessageInit extends ClientServerMessage {

        private _clientId: number = ++this.lastAttributeId;

        public setClientId(clientId: number): void {
            this.attributeList.set(this._clientId, clientId);
        }

        public getClientId(): number {
            return this.attributeList.get(this._clientId);
        }
    }

    export module ClientServerMessageInit {
        export const type = ModuleInfo.name + '.' + ClientServerMessageInit.name;
    }
}