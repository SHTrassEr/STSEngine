/// <reference path="ItemRectangle.ts" />

namespace STSEngine.Example {

    export class ItemTank extends ItemRectangle  {
        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ItemTank.Type);
        }
    }

    export module ItemTank {
        export const Type = ++Item.LastTypeId;
    }
}