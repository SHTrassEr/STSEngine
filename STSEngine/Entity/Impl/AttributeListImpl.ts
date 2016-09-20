namespace STSEngine {
    "use strict";

    export class AttributeListImpl implements IAttributeList {
        protected commitedAttributeList: Map<string, any>;
        protected attributeList: Map<string, any>;

        constructor() {
            this.commitedAttributeList = new Map<string, any>();
            this.attributeList = new Map<string, any>();
        }

        public getAttribute(attribute: string, defaultValue?: any): any {
            if (this.attributeList.has(attribute)) {
                return this.attributeList.get(attribute);
            }

            if (this.commitedAttributeList.has(attribute)) {
                return this.commitedAttributeList.get(attribute);
            }

            return defaultValue;
        }

        public setAttribute(attribute: string, value: any): void {
            this.attributeList.set(attribute, value);
        }

        public setAttributeList(attributeList: Map<string, any> | IKeyValuePair[]): void {
            if (attributeList instanceof Array) {
                this.setAttributeListArray(attributeList);
            }
            else {
                this.setAttributeListMap(attributeList);
            }
        }

        protected setAttributeListMap(attributeList: Map<string, any>): void {
            for (var kvp of attributeList) {
                var key: string = kvp[0];
                var value: any = kvp[1];
                this.attributeList.set(key, value);
            }
        }

        protected setAttributeListArray(attributeList: IKeyValuePair[]): void {
            for (var kvp of attributeList) {
                this.attributeList.set(kvp.key, kvp.value);
            }
        }

        public hasAttribute(attribute: string): boolean {
            if (this.attributeList.has(attribute)) {
                return true;
            }

            if (this.commitedAttributeList.has(attribute)) {
                return true;
            }

            return false;
        }

        public rollback(): void {
            this.attributeList.clear();
        }

        public commit(): void {
            if (this.isDirty()) {
                for (var kvp of this.attributeList) {
                    var key: string = kvp[0];
                    var value: any = kvp[1];
                    if (value === null || value === undefined) {
                        this.commitedAttributeList.delete(key);
                    } else {
                        this.commitedAttributeList.set(key, value);
                    }
                }

                this.attributeList.clear();
            }
        }

        public isDirty(): boolean {
            return this.attributeList.size > 0;
        }

        public removeAttribute(attribute: string): void {
            this.setAttribute(attribute, undefined);
        }

        public getKeyValuePairList(): IKeyValuePair[] {
            var list: IKeyValuePair[] = [];
            for (var kvp of this.attributeList) {
                var key: string = kvp[0];
                var value: any = kvp[1];
                if (value !== null && value !== undefined) {
                    list.push(new KeyValuePairImpl(key, value));
                }
            }

            for (var kvp of this.commitedAttributeList) {
                var key: string = kvp[0];
                var value: any = kvp[1];
                if (value !== null && value !== undefined) {
                    if (!this.attributeList.has(key)) {
                        list.push(new KeyValuePairImpl(key, value));
                    }
                }
            }

            return list;
        }
    }
}