namespace STSEngine {

    export interface IAttributeList extends IterableKeyValuePair, ICommitable {
        get(attribute: number, defaultValue?: any): any;
        set(attribute: number, value: any): void;
        setList(attributeList: Iterable<[number, any]>): void;
        has(attribute: number): boolean;
        delete(attribute: number): void;
    }
}