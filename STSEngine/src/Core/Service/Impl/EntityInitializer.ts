
namespace STSEngine {

    export abstract class EntityInitializer<T> implements IEntityInitializer<T> {

        private createIdHandler: () => number;
        protected itemAttributeType: number = 1;

        constructor(createIdHandler?: () => number) {
            this.createIdHandler = createIdHandler;
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

        protected createId() {
            return this.createIdHandler();
        }
    }
}