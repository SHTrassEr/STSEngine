/// <reference path="../../Entity/Impl/Entity.ts" />

namespace STSEngine {

    export class Item extends Entity implements IItem {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(Item.Type);
        }
    }

    export module Item {
        export let LastTypeId = 0;
        export const Type = ++LastTypeId;
    }
}