namespace STSEngine {
    "use strict";

    export class AttributeListImpl implements IAttributeList {
        protected attributeList: Map<string, any>;
        protected changedAttributeList: Map<string, any>;

        constructor() {
            this.attributeList = new Map<string, any>();
            this.changedAttributeList = new Map<string, any>();
        }

        public getAttribute(attribute: string, defaultValue?: any): any {
            if (this.changedAttributeList.has(attribute)) {
                return this.changedAttributeList.get(attribute);
            }

            if (this.attributeList.has(attribute)) {
                return this.attributeList.get(attribute);
            }

            return defaultValue;
        }

        public setAttribute(attribute: string, value: any): void {
            this.changedAttributeList.set(attribute, value);
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
                this.changedAttributeList.set(key, value);
            }
        }

        protected setAttributeListArray(attributeList: IKeyValuePair[]): void {
            for (var kvp of attributeList) {
                this.changedAttributeList.set(kvp.getKey(), kvp.getValue());
            }
        }

        public hasAttribute(attribute: string): boolean {
            if (this.changedAttributeList.has(attribute)) {
                return true;
            }

            if (this.attributeList.has(attribute)) {
                return true;
            }

            return false;
        }

        public rollback(): void {
            this.changedAttributeList.clear();
        }

        public commit(): void {
            if (this.isDirty()) {
                for (var kvp of this.changedAttributeList) {
                    var key: string = kvp[0];
                    var value: any = kvp[1];
                    if (value === null || value === undefined) {
                        this.attributeList.delete(key);
                    } else {
                        this.attributeList.set(key, value);
                    }
                }

                this.changedAttributeList.clear();
            }
        }

        public isDirty(): boolean {
            return this.changedAttributeList.size > 0;
        }

        public removeAttribute(attribute: string): void {
            this.setAttribute(attribute, undefined);
        }
    }
}