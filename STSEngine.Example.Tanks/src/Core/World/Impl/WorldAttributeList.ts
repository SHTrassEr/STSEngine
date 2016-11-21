namespace STSEngine.Example.Tanks {

    export class WorldAttributeList extends Core.WorldAttributeList implements IWorldAttributeList {

        private _worldSize: number = ++this.lastAttributeId;

        constructor(attributeList?: Core.IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);

            this.setWorldSize([1000, 6000]);
        }
    
        public getWorldSize(): [number, number] {
            return this.attributeList.get(this._worldSize);
        }

        public setWorldSize(size: [number, number]): void {
            this.attributeList.set(this._worldSize, size);
        }
    }

    export module WorldAttributeList {
        export const type = ModuleInfo.name + '.' + WorldAttributeList.name;
    }
}