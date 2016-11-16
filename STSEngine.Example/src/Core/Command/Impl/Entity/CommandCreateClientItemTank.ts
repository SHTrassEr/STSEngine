/// <reference path="Command.ts" />

namespace STSEngine.Example {

    export class CommandCreateClientItemTank extends Command {

        private _clientId: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            
            this.setType(CommandCreateClientItemTank.Type);
        }

        public getClientId(): number {
            return this.attributeList.get(this._clientId);
        }

        public setClientId(id: number): void {
            this.attributeList.set(this._clientId, id);
        }
    }

    export module CommandCreateClientItemTank {
        export const Type = ++Command.LastTypeId;
    }
}
