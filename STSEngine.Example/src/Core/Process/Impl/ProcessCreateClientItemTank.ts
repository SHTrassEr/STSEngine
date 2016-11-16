/// <reference path="Process.ts" />

namespace STSEngine.Example {

    export class ProcessCreateClientItemTank extends Process {

        private _clientId: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ProcessCreateClientItemTank.Type);
        }

        public getClientId(): number {
            return this.attributeList.get(this._clientId);
        }

        public setClientId(id: number): void {
            this.attributeList.set(this._clientId, id);
        }
    }

    export module ProcessCreateClientItemTank {
        export const Type = ++Item.LastTypeId;
    }
}