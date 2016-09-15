module STSEngine {
    "use strict";

    export abstract class ObjectImpl implements IObject {

        constructor(id: number, objectType: ObjectType) {
            this.id = id;
            this.objectType = objectType;
        }

        public getId(): number {
            return this.id;
        }

        protected id: number;
        protected objectType: ObjectType;
        protected moveDirection: number;
        protected position: IPoint;

        public getObjectType(): ObjectType {
            return this.objectType;
        }

        public setObjectType(objectType: ObjectType): void {
            this.objectType = objectType;
        }

        public getMoveDirection(): number {
            return this.moveDirection;
        }

        public setMoveDirection(moveDirection: number): void {
            this.moveDirection = moveDirection;
        }

        getPosition(): IPoint {
            return this.position;
        }

        setPosition(position: IPoint): void {
            this.position = position;
        }

    }
}