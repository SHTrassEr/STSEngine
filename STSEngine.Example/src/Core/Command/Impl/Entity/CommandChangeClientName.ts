/// <reference path="Command.ts" />

namespace STSEngine.Example {

    export class CommandChangeClientName extends Command {

        private _clientName: number = ++this.lastAttributeId;
        private _clientId: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            
            this.setType(CommandChangeClientName.Type);
        }

        public getClientName(): string {
            return this.attributeList.get(this._clientName);
        }

        public setClientName(name: string): void {
            this.attributeList.set(this._clientName, name);
        }

        public getClientId(): number {
            return this.attributeList.get(this._clientId);
        }

        public setClientId(id: number): void {
            this.attributeList.set(this._clientId, id);
        }
    }

    export module CommandChangeClientName {
        export const Type = ++Command.LastTypeId;
    }
}
