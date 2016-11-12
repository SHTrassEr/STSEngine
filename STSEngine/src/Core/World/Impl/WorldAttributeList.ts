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

        public getTickLength(): number {
            return this.attributeList.get(WorldAttributeType.TickLength, 50);
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

        public getLastProcessId(): number {
            return this.attributeList.get(WorldAttributeType.LastProcessId, 0);
        }

        public setLastProcessId(id: number) {
            this.attributeList.set(WorldAttributeType.LastProcessId, id);
        }

        public getLastObjectId(): number {
            return this.attributeList.get(WorldAttributeType.LastObjectId, 0);
        }

        public setLastObjectId(id: number) {
            this.attributeList.set(WorldAttributeType.LastObjectId, id);
        }
    }
}