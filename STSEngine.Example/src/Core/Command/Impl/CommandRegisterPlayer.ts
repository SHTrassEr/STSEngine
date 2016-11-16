/// <reference path="Command.ts" />

namespace STSEngine.Example {

    export class CommandRegisterPlayer extends Command {

        private _playerId: number = ++this.lastAttributeId;
        private _playerName: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);

            this.setType(CommandRegisterPlayer.Type);
        }


        public getPlayerId(): number {
            return this.attributeList.get(this._playerId);
        }

        public setPlayerId(id: number): void {
            this.attributeList.set(this._playerId, id);
        }


        public getPlayerName(): string {
            return this.attributeList.get(this._playerName);
        }

        public setPlayerName(playerName: string): void {
            this.attributeList.set(this._playerName, playerName);
        }

    }

    export module CommandRegisterPlayer {
        export const Type = ++Command.LastTypeId;
    }
}