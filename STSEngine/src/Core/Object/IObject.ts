namespace STSEngine {

    export interface IObject extends IterableKeyValuePair {
        getId(): number;
        setId(id: number): void;

        getType(): number;
        setType(type: number): void;

        getAttributeList(): IAttributeList;
    }
}