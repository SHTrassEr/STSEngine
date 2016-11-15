/// <reference path="ItemRectangle.ts" />

namespace STSEngine.Example {

    export class ItemPlayer extends ItemRectangle  {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.initDefault();
            
        }

        protected initDefault() {
            this.setType(ItemType.Player);

            if (!this.getMoveDirection()) {
                this.setMoveDirection(MoveDirection.Up);
            }

            if (!this.getSize()) {
                this.setSize([5, 5]);
            }
            

        }
    
    }
}

namespace STSEngine {

    export module ItemType {
        export const Player = getNewTypeId();
    }
}