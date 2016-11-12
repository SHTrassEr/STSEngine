namespace STSEngine.Example {

    export class ObjectRectangle extends STSEngine.ObjectImpl implements IObjectRectangle {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setObjectType(ObjectType.Player);
        }

        public getPosition(): [number, number] {
            return this.attributeList.get(ObjectAttributeType.Position);
        }

        public setPosition(position: [number, number]): void {
            this.attributeList.set(ObjectAttributeType.Position, position);
        }


        public getPlayerId(): number {
            return this.attributeList.get(ObjectAttributeType.PlayerId);
        }

        public setPlayerId(playerId: number): void {
            this.attributeList.set(ObjectAttributeType.PlayerId, playerId);
        }

        public getMaxSpeed(): number {
            return this.attributeList.get(ObjectAttributeType.MaxSpeed);
        }

        public setMaxSpeed(speed: number): void {
            this.attributeList.set(ObjectAttributeType.MaxSpeed, speed);
        }

        public getSize(): [number, number] {
            return this.attributeList.get(ObjectAttributeType.Size);
        }

        public setSize(size: [number, number]): void {
            this.attributeList.set(ObjectAttributeType.Size, size);
        }

        public getMoveDirection(): MoveDirection {
            return this.attributeList.get(ObjectAttributeType.MoveDirection);
        }

        public setMoveDirection(direction: MoveDirection): void {
            this.attributeList.set(ObjectAttributeType.MoveDirection, direction);
        }
    }
}