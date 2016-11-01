namespace STSEngine {

    export interface IObject extends IterableKeyValuePair {
        getId(): number;
        setId(id: number): void;

        getObjectType(): number;
        setObjectType(objectType: number): void;

        getAttributeList(): IAttributeList;
    }
}