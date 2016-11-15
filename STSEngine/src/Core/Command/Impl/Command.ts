/// <reference path="../../Entity/Impl/Entity.ts" />

namespace STSEngine {

    export class Command extends Entity implements ICommand {

        private _initiatorId: number = ++this.lastAttributeId;

        public getInitiatorId(): number {
            return this.attributeList.get(this._initiatorId);
        }

        public setInitiatorId(id: number): void {
            this.attributeList.set(this._initiatorId, id);
        }
    }
}