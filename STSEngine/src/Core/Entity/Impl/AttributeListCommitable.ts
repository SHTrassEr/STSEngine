namespace STSEngine {

    export class AttributeListCommitable implements IAttributeList {
        protected deletedAttributeList: Set<number>;
        protected commitedAttributeList: Map<number, any>;
        protected attributeList: Map<number, any>;

        constructor() {
            this.commitedAttributeList = new Map<number, any>();
            this.attributeList = new Map<number, any>();
            this.deletedAttributeList = new Set<number>();
        }

        public get(attribute: number, defaultValue?: any): any {
            if (!this.deletedAttributeList.has(attribute)) {
                if (this.attributeList.has(attribute)) {
                    return this.attributeList.get(attribute);
                }

                if (this.commitedAttributeList.has(attribute)) {
                    return this.commitedAttributeList.get(attribute);
                }
            }

            return defaultValue;
        }

        public set(attribute: number, value: any): void {
            this.attributeList.set(attribute, value);
            this.deletedAttributeList.delete(attribute);
        }

        public setList(attributeList: Iterable<[number, any]>): void {
            for (let kvp of attributeList) {
                this.attributeList.set(kvp[0], kvp[1]);
            }
        }

        public has(attribute: number): boolean {
            if (!this.deletedAttributeList.has(attribute)) {
                if (this.attributeList.has(attribute)) {
                    return true;
                }

                if (this.commitedAttributeList.has(attribute)) {
                    return true;
                }
            }

            return false;
        }

        public rollback(): void {
            this.attributeList.clear();
            this.deletedAttributeList.clear();
        }

        public commit(): void {
            if (this.isDirty()) {
                for (let kvp of this.attributeList) {
                    this.commitedAttributeList.set(kvp[0], kvp[1]);
                }

                for (let attribute of this.deletedAttributeList) {
                    this.commitedAttributeList.delete(attribute);
                }

                this.attributeList.clear();
                this.deletedAttributeList.clear();
            }
        }

        public isDirty(): boolean {
            return (this.attributeList.size > 0) || (this.deletedAttributeList.size > 0);
        }

        public delete(attribute: number): void {
            this.attributeList.delete(attribute);
            if (this.commitedAttributeList.has(attribute)) {
                this.deletedAttributeList.add(attribute);
            }
        }


        [Symbol.iterator]
        public getIterator(): IterableIterator<[number, any]> {
            return this.attributeList.entries();
        }

        public getList(): [number, any][] {
            let list: [number, any][] = [];
            for (let kvp of this.attributeList) {
                list.push(kvp);
            }

            for (let kvp of this.commitedAttributeList) {
                let attribute: number = kvp[0];
                let value: any = kvp[1];
                if (!this.attributeList.has(attribute) && !this.deletedAttributeList.has(attribute)) {
                    list.push(kvp);
                }
            }

            return list;
        }
    }
}