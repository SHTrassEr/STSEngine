/// <reference path="../../Service/Impl/EntityInitializer.ts" />

namespace STSEngine {

    export abstract class ItemInitializer extends EntityInitializer<IItem> implements IItemInitializer {

        protected createByType(type: number, attr?: Iterable<[number, any]>): IItem {
            switch (type) {
                case Item.Type:
                    return this.createItem(attr);
            }
        }

        public createItem(attr?: Iterable<[number, any]>): Item {
            var object = new Item(this.createAttributeList(), attr);
            this.initId(object);
            return object;
        }
    }
}

