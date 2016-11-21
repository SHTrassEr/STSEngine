/// <reference path="Command.ts" />

namespace STSEngine.Example.Tanks {

    export class CommandRegisterClient extends Command {

        private _clientId: number = ++this.lastAttributeId;
        private _clientName: number = ++this.lastAttributeId;

        public getClientId(): number {
            return this.attributeList.get(this._clientId);
        }

        public setClientId(id: number): void {
            this.attributeList.set(this._clientId, id);
        }


        public getClientName(): string {
            return this.attributeList.get(this._clientName);
        }

        public setClientName(clientName: string): void {
            this.attributeList.set(this._clientName, clientName);
        }

    }

    export module CommandRegisterClient {
        export const type = ModuleInfo.name + '.' + CommandRegisterClient.name;
    }
}