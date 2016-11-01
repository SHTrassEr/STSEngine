namespace STSEngine {

    export class AttributeList implements IAttributeList {
        protected attributeList: Map<number, any>;

        constructor() {
            this.attributeList = new Map<number, any>();
        }

        public get(attribute: number, defaultValue?: any): any {
            if (this.attributeList.has(attribute)) {
                return this.attributeList.get(attribute);
            }
            
            return defaultValue;
        }


        public set(attribute: number, value: any): void {
            this.attributeList.set(attribute, value);
        }

        public setList(attributeList: Iterable<[number, any]>): void {
            for (let kvp of attributeList) {
                this.attributeList.set(kvp[0], kvp[1]);
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
        public getIterator(): IterableIterator<[number, any]> {
            return this.attributeList.entries();
        }

        public has(attribute: number): boolean {
            return this.attributeList.has(attribute);
        }

        public delete(attribute: number): void {
            this.attributeList.delete(attribute);
        }

        public getList(): [number, any][] {
            let list: [number, any][] = [];
            for (let kvp of this.attributeList) {
                if (kvp[1] !== null && kvp[1] !== undefined) {
                    list.push(kvp);
                }
            }

            return list;
        }
    }
}