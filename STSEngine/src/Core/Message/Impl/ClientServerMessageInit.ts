﻿namespace STSEngine {

    export class ClientServerMessageInit extends ClientServerMessage {

        private _playerId: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ClientServerMessageType.Init);
        }

        public setPlayerId(playerId: number): void {
            this.attributeList.set(this._playerId, playerId);
        }

        public getPlayerId(): number {
            return this.attributeList.get(this._playerId);
        }
    }

    export module ClientServerMessageType {
        export const Init = ClientServerMessageType.getNewTypeId();
    }
}