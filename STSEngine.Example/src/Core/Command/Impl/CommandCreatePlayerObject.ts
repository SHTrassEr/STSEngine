/// <reference path="Command.ts" />

namespace STSEngine.Example {

    export class CommandCreatePlayerObject extends Command {

        private _playerId: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            
            this.setType(CommandCreatePlayerObject.Type);
        }

        public getPlayerId(): number {
            return this.attributeList.get(this._playerId);
        }

        public setPlayerId(id: number): void {
            this.attributeList.set(this._playerId, id);
        }
    }

    export module CommandCreatePlayerObject {
        export const Type = ++Command.LastTypeId;
    }
}
