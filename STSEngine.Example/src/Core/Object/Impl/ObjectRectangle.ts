namespace STSEngine.Example {

    export abstract class ObjectRectangle extends STSEngine.ObjectImpl implements IObjectRectangle {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
        }

        public getPosition(): [number, number];
        public getPosition(d: number): number;
        public getPosition(d?: number): [number, number] | number {
            if (typeof d == 'number') {
                return this.attributeList.get(ObjectAttributeType.Position)[d];
            }

            return this.attributeList.get(ObjectAttributeType.Position);
        }

        public getPositionPrecise(): [number, number];
        public getPositionPrecise(d: number): number;
        public getPositionPrecise(d?: number): [number, number] | number {
            if (typeof d == 'number') {
                return this.attributeList.get(ObjectAttributeType.PositionPrecise)[d];
            }

            return this.attributeList.get(ObjectAttributeType.PositionPrecise);
        }

        public setPositionPrecise(position: [number, number]): void {
            this.attributeList.set(ObjectAttributeType.PositionPrecise, position);
            this.setPosition([Math.floor(position[0]), Math.floor(position[1])]);
        }

        protected setPosition(position: [number, number]): void {
            this.attributeList.set(ObjectAttributeType.Position, position);
        }


        public getPlayerId(): number {
            return this.attributeList.get(ObjectAttributeType.PlayerId);
        }

        public setPlayerId(playerId: number): void {
            this.attributeList.set(ObjectAttributeType.PlayerId, playerId);
        }

        public getMinSpeed(): number {
            return this.attributeList.get(ObjectAttributeType.MinSpeed);
        }

        public setMinSpeed(speed: number): void {
            this.attributeList.set(ObjectAttributeType.MinSpeed, speed);
        }

        public getMaxSpeed(): number {
            return this.attributeList.get(ObjectAttributeType.MaxSpeed);
        }

        public setMaxSpeed(speed: number): void {
            this.attributeList.set(ObjectAttributeType.MaxSpeed, speed);
        }

        public getSize(): [number, number];
        public getSize(d: number): number;
        public getSize(d?: number): [number, number] | number {

            if (d) {
                return this.attributeList.get(ObjectAttributeType.Size)[d];
            }
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