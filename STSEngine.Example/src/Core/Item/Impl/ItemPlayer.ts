/// <reference path="ItemRectangle.ts" />

namespace STSEngine.Example {

    export class ItemPlayer extends ItemRectangle  {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ItemPlayer.Type);
        }
    }

    export module ItemPlayer {
        export const Type = ++Item.LastTypeId;
    }
}