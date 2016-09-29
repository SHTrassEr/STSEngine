namespace STSEngine {

    export interface IObject extends IAttributeList{
        getId(): number;
        getObjectType(): ObjectType;
        setObjectType(objectType: ObjectType): void;

        getPosition(): IPoint;
        setPosition(position: IPoint): void;

        getPlayerId(): number;
        setPlayerId(playerId: number): void;
    }
}