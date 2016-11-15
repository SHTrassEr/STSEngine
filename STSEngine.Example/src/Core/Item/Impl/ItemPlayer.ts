/// <reference path="ItemRectangle.ts" />

namespace STSEngine.Example {

    export class ItemPlayer extends ItemRectangle  {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ObjectType.Player);

            this.setMoveDirection(MoveDirection.Up);
            this.setSize([5, 5]);
        }
    
    }
}