namespace STSEngine {

    export class ObjectImpl implements IObject {

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

        public getId(): number {
            return this.attributeList.get(ObjectAttributeType.Id);
        }

        public setId(id: number): void {
            this.attributeList.set(ObjectAttributeType.Id, id);
        }

        public getObjectType(): number {
            return this.attributeList.get(ObjectAttributeType.Type);
        }

        public setObjectType(objectType: number): void {
            this.attributeList.set(ObjectAttributeType.Type, objectType);
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