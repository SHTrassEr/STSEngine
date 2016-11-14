
namespace STSEngine {

    export abstract class ItemInitializer<T> implements IItemInitializer<T> {

        protected getId: () => number;
        protected itemAttributeType: number;

        constructor(itemAttributeType: number) {
            this.itemAttributeType = itemAttributeType;
        }

        public create(attr: Iterable<[number, any]> | number): T {
            if (attr instanceof Number) {
                return this.createByType(attr);
            }

            return this.createByAttr(<Iterable<[number, any]>>attr);
        }

        protected getItemType(attr: Iterable<[number, any]>): number {
            for (var kvp of attr) {
                if (kvp[0] == this.itemAttributeType) {
                    return kvp[1];
                }
            }

            return 0;
        }

        public * createList(attrList: Iterable<Iterable<[number, any]>>): Iterable<T> {
            for (let attr of attrList) {
                yield this.create(attr);
            }
        }

        protected abstract createByType(type: number, attr?: Iterable<[number, any]>): T;

        protected createByAttr(attr: Iterable<[number, any]>): T {
            var itemType = this.getItemType(attr);
            return this.createByType(itemType, attr);
        }

        public setGetIdHandler(getId: () => number) {
            this.getId = getId;
        }
    }
}