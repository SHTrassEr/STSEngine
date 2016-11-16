/// <reference path="Item.ts" />

namespace STSEngine.Example {

    export class ItemBullet extends Item  {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ItemBullet.Type);
        }
    }

    export module ItemBullet {
        export const Type = ++Item.LastTypeId;
    }
}