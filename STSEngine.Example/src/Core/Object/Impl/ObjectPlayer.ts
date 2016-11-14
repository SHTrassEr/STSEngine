/// <reference path="ObjectRectangle.ts" />

namespace STSEngine.Example {

    export class ObjectPlayer extends ObjectRectangle  {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ObjectType.Player);

            this.setMoveDirection(MoveDirection.Up);
            this.setSize([5, 5]);
        }
    
    }
}