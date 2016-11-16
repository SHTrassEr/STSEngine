/// <reference path="Command.ts" />

namespace STSEngine.Example {

    export class CommandSetClientForceVector extends Command {

        private _itemId: number = ++this.lastAttributeId;
        private _clientForceVector: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);

            this.setType(CommandSetClientForceVector.Type);
        }

        public getItemId(): number {
            return this.attributeList.get(this._itemId);
        }

        public setItemId(id: number): void {
            this.attributeList.set(this._itemId, id);
        }

        public getClientForceVector(): [number, number] {
            return this.attributeList.get(this._clientForceVector);
        }

        public setClientForceVector(clientForceVector: [number, number]): void {
            this.attributeList.set(this._clientForceVector, clientForceVector);
        }
    }

    export module CommandSetClientForceVector {
        export const Type = ++Command.LastTypeId;
    }
}
