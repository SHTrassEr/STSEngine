namespace STSEngine {

    export class AttributeListArray implements IAttributeList {
        protected attributeList: any[];

        constructor() {
            this.attributeList = [];
        }

        public get(attribute: number, defaultValue?: any): any {
            if (attribute >= 0 && attribute < this.attributeList.length) {
                let value = this.attributeList[attribute];
                if (value !== undefined) {
                    return this.attributeList[attribute];
                }
            }
            
            return defaultValue;
        }


        public set(attribute: number, value: any): void {
            this.attributeList[attribute] = value;
        }

        public setList(attributeList: Iterable<[number, any]>): void {
            for (let kvp of attributeList) {
                this.set(kvp[0], kvp[1]);
            }
        }

        public rollback(): void {
        }

        public commit(): void {
        }

        public isDirty(): boolean {
            return false;
        }

        [Symbol.iterator]
        public * getIterator(): IterableIterator<[number, any]> {
            for (let key = 0; key < this.attributeList.length; key++) {
                let value = this.attributeList[key];
                if (value !== undefined) {
                    yield [key, value];
                }
            }
        }

        public has(attribute: number): boolean {
            if (attribute >= 0 && attribute < this.attributeList.length) {
                if (this.attributeList[attribute] !== undefined) {
                    return true;
                }
            }
            return false;
        }

        public delete(attribute: number): void {
            this.attributeList[attribute] = undefined;
        }

        public getList(): [number, any][] {
            let list: [number, any][] = [];

            for (let key = 0; key < this.attributeList.length; key++) {
                let value = this.attributeList[key];
                if (value !== null && value !== undefined) {
                    list.push([key, value]);
                }
            }

            return list;
        }
    }
}