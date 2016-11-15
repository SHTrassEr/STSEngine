namespace STSEngine {

    export interface IItem extends IEntity {
        getId(): number;
        setId(id: number): void;

        getType(): number;
        setType(type: number): void;

        getAttributeList(): IAttributeList;
    }
}