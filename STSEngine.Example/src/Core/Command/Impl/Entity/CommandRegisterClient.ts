/// <reference path="Command.ts" />

namespace STSEngine.Example {

    export class CommandRegisterClient extends Command {

        private _clientId: number = ++this.lastAttributeId;
        private _clientName: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);

            this.setType(CommandRegisterClient.Type);
        }


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
        export const Type = ++Command.LastTypeId;
    }
}