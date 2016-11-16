/// <reference path="../../Entity/Impl/Entity.ts" />

namespace STSEngine {

    export class Command extends Entity implements ICommand {

        private _initiatorId: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);

            this.setType(Command.Type);
        }

        public getInitiatorId(): number {
            return this.attributeList.get(this._initiatorId);
        }

        public setInitiatorId(id: number): void {
            this.attributeList.set(this._initiatorId, id);
        }
    }

    export module Command {
        export let LastTypeId = 0;
        export const Type = ++LastTypeId;
    }
}