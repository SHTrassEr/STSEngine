/// <reference path="Process.ts" />

namespace STSEngine.Example.Tanks {

    export class ProcessFire extends Process {

        private _itemId: number = ++this.lastAttributeId;
        private _position: number = ++this.lastAttributeId;

        public getItemId(): number {
            return this.attributeList.get(this._itemId);
        }

        public setItemId(id: number): void {
            this.attributeList.set(this._itemId, id);
        }

        public getPosition(): IVector {
            return VectorHelper.parse(this.attributeList.get(this._position));
        }

        public setPosition(position: IVector): void {
            this.attributeList.set(this._position, new Vector(position));
        }
    }

    export module ProcessFire {
        export const type = ModuleInfo.name + '.' + ProcessFire.name;
    }
}