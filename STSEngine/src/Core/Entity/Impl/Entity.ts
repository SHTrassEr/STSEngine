namespace STSEngine {

    export class Entity implements IEntity {

        protected attributeList: IAttributeList;

        protected lastAttributeId: number = 0;
        private _type: number = ++this.lastAttributeId;
        private _id: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            if (attributeList) {
                this.attributeList = attributeList;
            } else {
                this.attributeList = new AttributeListArray();
            } 
            
            if (kvpList) {
                this.attributeList.setList(kvpList);
            }
        }

        public getType(): number {
            return this.attributeList.get(this._type);
        }

        public setType(type: number): void {
            this.attributeList.set(this._type, type);
        }

        public getId(): number {
            return this.attributeList.get(this._id);
        }

        public setId(id: number): void {
            this.attributeList.set(this._id, id);
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