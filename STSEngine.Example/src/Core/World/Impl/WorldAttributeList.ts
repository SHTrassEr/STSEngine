namespace STSEngine.Example {

    export class WorldAttributeList extends STSEngine.WorldAttributeList implements IWorldAttributeList {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);

            this.setWorldSize([100, 80]);
        }
    
        public getWorldSize(): [number, number] {
            return this.attributeList.get(WorldAttributeType.WorldSize);
        }

        setWorldSize(size: [number, number]): void {
            this.attributeList.set(WorldAttributeType.WorldSize, size);
        }
    }
}