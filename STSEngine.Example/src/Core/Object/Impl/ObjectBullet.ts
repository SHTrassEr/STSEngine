/// <reference path="ObjectRectangle.ts" />

namespace STSEngine.Example {

    export class ObjectBullet extends ObjectRectangle  {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ObjectType.Bullet);
            this.setSize([1, 1]);
        }
    }
}