namespace STSEngine {
    "use strict";

    export interface IObject extends IAttributeList{
        getId(): number;
        getObjectType(): ObjectType;
        setObjectType(objectType: ObjectType): void;

        getMoveDirection(): number;
        setMoveDirection(moveDirection: number): void;

        getPosition(): IPoint;
        setPosition(position: IPoint): void;

        getPlayerId(): number;
        setPlayerId(playerId: number): void;
    }
}