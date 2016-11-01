namespace STSEngine {

    export class WorldAttributeList implements IWorldAttributeList {

        protected attributeList: IAttributeList;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            if (attributeList) {
                this.attributeList = attributeList;
            } else {
                this.attributeList = new AttributeList();
            }

            if (kvpList) {
                this.attributeList.setList(kvpList);
            }
        }

        public getMoveStepSize(): number {
            return 1;
        }

        public getTickLength(): number {
            return 1;
        }

        public getList(): [number, any][] {
            return this.attributeList.getList();
        }

        [Symbol.iterator]
        public getIterator(): IterableIterator<[number, any]> {
            return this.attributeList.getIterator();
        }

        public getAttributeList(): IAttributeList {
            return this.attributeList;
        }
    }
}