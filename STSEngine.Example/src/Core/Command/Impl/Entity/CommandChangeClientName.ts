/// <reference path="Command.ts" />

namespace STSEngine.Example {

    export class CommandChangeClientName extends Command {

        private _clientName: number = ++this.lastAttributeId;
        private _clientId: number = ++this.lastAttributeId;

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
        export const type = ModuleInfo.name + '.' + CommandChangeClientName.name;
    }
}
