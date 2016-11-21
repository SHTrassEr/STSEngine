/// <reference path="Process.ts" />

namespace STSEngine.Example.Tanks {

    export class ProcessMoveItem extends Process {

        private _itemId: number = ++this.lastAttributeId;
        private _moveDirection: number = ++this.lastAttributeId;

        public getItemId(): number {
            return this.attributeList.get(this._itemId);
        }

        public setItemId(id: number): void {
            this.attributeList.set(this._itemId, id);
        }

    }

    export module ProcessMoveItem {
        export const type = ModuleInfo.name + '.' + ProcessMoveItem.name;
    }
}