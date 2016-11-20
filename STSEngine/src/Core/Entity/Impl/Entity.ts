/// <reference path="../../ModuleInfo.ts" />

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

            let currentType = this.getType();
            let type = (<any>(this.constructor)).type;
            if (!type || (currentType && currentType != type)) {
                throw new Error();
            }

            this.setType(type);
        }

        public getType(): string {
            return this.attributeList.get(this._type);
        }

        private setType(type: string): void {
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

        public setList(attributeList: Iterable<[number, any]>, clear?: boolean): void {
            this.attributeList.setList(attributeList, clear);
        }

        [Symbol.iterator]
        public getIterator(): IterableIterator<[number, any]> {
            return this.attributeList.getIterator();
        }

        public getAttributeList(): IAttributeList {
            return this.attributeList;
        }
    }

    export module Entity {
        export const type = ModuleInfo.name + '.' + Entity.name;
    }

}