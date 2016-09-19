namespace STSEngine {
    "use strict";

    export class KeyValuePairImpl implements IKeyValuePair {
        private key: string;
        private value: any;

        constructor(key: string, value: any) {
            this.key = key;
            this.value = value;
        }

        public getKey(): string {
            return this.key;
        }

        public getValue(): any {
            return this.value;
        }
    }

}