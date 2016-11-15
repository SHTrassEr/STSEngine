/// <reference path="ItemRectangle.ts" />

namespace STSEngine.Example {

    export class ItemBullet extends ItemRectangle  {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ItemType.Bullet);
            this.setSize([1, 1]);
        }
    }
}

namespace STSEngine {

    export module ItemType {
        export const Bullet = getNewTypeId();
    }
}
