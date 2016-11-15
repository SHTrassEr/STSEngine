namespace STSEngine.Example {

    export class WorldAttributeList extends STSEngine.WorldAttributeList implements IWorldAttributeList {

        private _worldSize: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);

            this.setWorldSize([1000, 1000]);
        }
    
        public getWorldSize(): [number, number] {
            return this.attributeList.get(this._worldSize);
        }

        public setWorldSize(size: [number, number]): void {
            this.attributeList.set(this._worldSize, size);
        }
    }
}