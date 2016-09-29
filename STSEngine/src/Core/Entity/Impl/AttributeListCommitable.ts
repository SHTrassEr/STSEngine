namespace STSEngine {

    export class AttributeListCommitable implements ICommitableAttributeList {
        protected deletedAttributeList: Set<string>;
        protected commitedAttributeList: Map<string, any>;
        protected attributeList: Map<string, any>;

        constructor() {
            this.commitedAttributeList = new Map<string, any>();
            this.attributeList = new Map<string, any>();
            this.deletedAttributeList = new Set<string>();
        }

        public get(attribute: string, defaultValue?: any): any {
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

        public set(attribute: string, value: any): void {
            this.attributeList.set(attribute, value);
            this.deletedAttributeList.delete(attribute);
        }

        public setList(attributeList: Map<string, any> | IKeyValuePair[]): void {
            if (attributeList instanceof Array) {
                this.setAttributeListArray(attributeList);
            }
            else {
                this.setAttributeListMap(attributeList);
            }
        }

        protected setAttributeListMap(attributeList: Map<string, any>): void {
            for (let kvp of attributeList) {
                let key: string = kvp[0];
                let value: any = kvp[1];
                this.attributeList.set(key, value);
            }
        }

        protected setAttributeListArray(attributeList: IKeyValuePair[]): void {
            for (let kvp of attributeList) {
                this.attributeList.set(kvp.key, kvp.value);
            }
        }

        public has(attribute: string): boolean {
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

        public delete(attribute: string): void {
            this.attributeList.delete(attribute);
            if (this.commitedAttributeList.has(attribute)) {
                this.deletedAttributeList.add(attribute);
            }
        }

        public getKeyValuePairList(): IKeyValuePair[] {
            let list: IKeyValuePair[] = [];
            for (let kvp of this.attributeList) {
                list.push(new KeyValuePair(kvp[0], kvp[1]));
            }

            for (let kvp of this.commitedAttributeList) {
                let attribute: string = kvp[0];
                let value: any = kvp[1];
                if (!this.attributeList.has(attribute) && !this.deletedAttributeList.has(attribute)) {
                    list.push(new KeyValuePair(attribute, value));
                }
            }

            return list;
        }
    }
}