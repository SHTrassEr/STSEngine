namespace STSEngine {

    export interface IEntity extends IterableKeyValuePair {

        getType(): string;

        getId(): number;
        setId(id: number): void;

        getAttributeList(): IAttributeList;

        setList(attributeList: Iterable<[number, any]>, clear?: boolean): void;
    }
}