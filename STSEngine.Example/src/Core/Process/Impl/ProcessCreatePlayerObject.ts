/// <reference path="Process.ts" />

namespace STSEngine.Example {

    export class ProcessCreatePlayerObject extends Process {

        private _playerId: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ProcessCreatePlayerObject.Type);
        }

        public getPlayerId(): number {
            return this.attributeList.get(this._playerId);
        }

        public setPlayerId(id: number): void {
            this.attributeList.set(this._playerId, id);
        }
    }

    export module ProcessCreatePlayerObject {
        export const Type = ++Item.LastTypeId;
    }
}