namespace STSEngine {

    export interface IEntity extends IterableKeyValuePair {

        getType(): number;
        setType(type: number): void;

        getId(): number;
        setId(id: number): void;

        getAttributeList(): IAttributeList;
    }
}