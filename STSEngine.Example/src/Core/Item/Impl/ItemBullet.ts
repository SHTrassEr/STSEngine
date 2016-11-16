/// <reference path="ItemRectangle.ts" />

namespace STSEngine.Example {

    export class ItemBullet extends ItemRectangle  {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ItemBullet.Type);
        }
    }

    export module ItemBullet {
        export const Type = ++Item.LastTypeId;
    }
}