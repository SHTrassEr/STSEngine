/// <reference path="../../Entity/Impl/Entity.ts" />

namespace STSEngine {

    export class Player extends Entity implements IPlayer {

        protected attributeList: IAttributeList;

        protected attributeNameId: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ItemType.Player);
        }

        public getName(): string {
            return this.attributeList.get(this.attributeNameId);
        }

        public setName(name: string): void {
            this.attributeList.set(this.attributeNameId, name);
        }
    }
}