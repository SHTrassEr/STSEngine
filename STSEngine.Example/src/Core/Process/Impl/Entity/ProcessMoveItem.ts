/// <reference path="Process.ts" />

namespace STSEngine.Example {

    export class ProcessMoveItem extends Process {

        private _itemId: number = ++this.lastAttributeId;
        private _moveDirection: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ProcessMoveItem.Type);
        }

        public getItemId(): number {
            return this.attributeList.get(this._itemId);
        }

        public setItemId(id: number): void {
            this.attributeList.set(this._itemId, id);
        }

    }

    export module ProcessMoveItem {
        export const Type = ++Item.LastTypeId;
    }
}