/// <reference path="Command.ts" />

namespace STSEngine.Example {

    export class CommandApplyForce extends Command {

        private _itemId: number = ++this.lastAttributeId;
        private _force: number = ++this.lastAttributeId;

        public getItemId(): number {
            return this.attributeList.get(this._itemId);
        }

        public setItemId(id: number): void {
            this.attributeList.set(this._itemId, id);
        }

        public getForce(): IVector {
            return VectorHelper.parse(this.attributeList.get(this._force));
        }

        public setForce(force: IVector): void {
            this.attributeList.set(this._force, new Vector(force));
        }
    }

    export module CommandApplyForce {
        export const type = ModuleInfo.name + '.' + CommandApplyForce.name;
    }
}
