/// <reference path="Command.ts" />

namespace STSEngine.Example {

    export class CommandChangePlayerName extends Command {

        private _playerName: number = ++this.lastAttributeId;
        private _playerId: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            
            this.setType(CommandChangePlayerName.Type);
        }

        public getPlayerName(): string {
            return this.attributeList.get(this._playerName);
        }

        public setPlayerName(name: string): void {
            this.attributeList.set(this._playerName, name);
        }

        public getPlayerId(): number {
            return this.attributeList.get(this._playerId);
        }

        public setPlayerId(id: number): void {
            this.attributeList.set(this._playerId, id);
        }
    }

    export module CommandChangePlayerName {
        export const Type = ++Command.LastTypeId;
    }
}
