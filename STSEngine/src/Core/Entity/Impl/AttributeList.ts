namespace STSEngine {

    export class AttributeList implements IAttributeList {
        protected attributeList: Map<string, any>;

        constructor() {
            this.attributeList = new Map<string, any>();
        }

        public get(attribute: string, defaultValue?: any): any {
            if (this.attributeList.has(attribute)) {
                return this.attributeList.get(attribute);
            }

            return defaultValue;
        }

        public set(attribute: string, value: any): void {
            this.attributeList.set(attribute, value);
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
            return this.attributeList.has(attribute);
        }

        public delete(attribute: string): void {
            this.attributeList.delete(attribute);
        }

        public getKeyValuePairList(): IKeyValuePair[] {
            let list: IKeyValuePair[] = [];
            for (let kvp of this.attributeList) {
                let key: string = kvp[0];
                let value: any = kvp[1];
                if (value !== null && value !== undefined) {
                    list.push(new KeyValuePair(key, value));
                }
            }

            return list;
        }
    }
}