/// <reference path="Command.ts" />

namespace STSEngine.Example {

    export class CommandFire extends Command {

        private _itemId: number = ++this.lastAttributeId;
        private _position: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);

            this.setType(CommandFire.Type);
        }

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

    export module CommandFire {
        export const Type = ++Command.LastTypeId;
    }
}