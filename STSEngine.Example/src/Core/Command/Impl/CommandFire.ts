/// <reference path="Command.ts" />

namespace STSEngine.Example {

    export class CommandFire extends Command {

        private _objectId: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);

            this.setType(CommandFire.Type);
        }

        public getObjectId(): number {
            return this.attributeList.get(this._objectId);
        }

        public setObjectId(id: number): void {
            this.attributeList.set(this._objectId, id);
        }
    }

    export module CommandFire {
        export const Type = ++Command.LastTypeId;
    }
}