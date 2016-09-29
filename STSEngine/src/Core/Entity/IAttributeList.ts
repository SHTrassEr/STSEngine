namespace STSEngine {

    export interface IAttributeList {
        get(attribute: string, defaultValue?: any): any;
        set(attribute: string, value: any): void;
        setList(attributeList: Map<string, any> | IKeyValuePair[]): void;
        has(attribute: string): boolean;
        delete(attribute: string): void;
        getKeyValuePairList(): IKeyValuePair[];
    }
}