/// <reference path="ClientServerMessage.ts" />

namespace STSEngine.Core {

    export class ClientServerMessageResponseAuthentication extends ClientServerMessage {

        private _sid: number = ++this.lastAttributeId;

        public setSID(sid: string): void {
            this.attributeList.set(this._sid, sid);
        }

        public getSID(): string {
            return this.attributeList.get(this._sid);
        }
    }

    export module ClientServerMessageResponseAuthentication {
        export const type = ModuleInfo.name + '.' + ClientServerMessageResponseAuthentication.name;
    }
}