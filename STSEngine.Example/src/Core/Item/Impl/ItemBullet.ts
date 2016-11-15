/// <reference path="ItemRectangle.ts" />

namespace STSEngine.Example {

    export class ItemBullet extends ItemRectangle  {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ObjectType.Bullet);
            this.setSize([1, 1]);
        }
    }
}