namespace STSEngine {

    export class KeyValuePair implements IKeyValuePair {
        public key: string;
        public value: any;

        constructor(key: string, value: any) {
            this.key = key;
            this.value = value;
        }
    }

}