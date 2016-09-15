module STSEngine {
    "use strict";

    export interface IObject {

        getId(): number;
        getObjectType(): ObjectType;
        setObjectType(objectType: ObjectType): void;

        getMoveDirection(): number;
        setMoveDirection(moveDirection: number): void;

        getPosition(): IPoint;
        setPosition(position: IPoint): void;
    }
}