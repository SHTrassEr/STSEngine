/// <reference path="Process.ts" />

namespace STSEngine.Example {

    export class ProcessCreatePlayerObject extends Process {

        private _playerId: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ProcessType.CreatePlayerObject);
        }

        public getPlayerId(): number {
            return this.attributeList.get(this._playerId);
        }

        public setPlayerId(id: number): void {
            this.attributeList.set(this._playerId, id);
        }
    }
}

namespace STSEngine {

    export module ProcessType {
        export const CreatePlayerObject = getNewTypeId();
    }
}