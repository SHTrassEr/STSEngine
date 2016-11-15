namespace STSEngine.Example {

    export abstract class ItemRectangle extends STSEngine.Item implements IItemRectangle {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
        }

        private _position: number = ++this.lastAttributeId;
        private _positionPrecise: number = ++this.lastAttributeId;
        private _playerId: number = ++this.lastAttributeId;
        private _minSpeed: number = ++this.lastAttributeId;
        private _maxSpeed: number = ++this.lastAttributeId;
        private _size: number = ++this.lastAttributeId;
        private _moveDirection: number = ++this.lastAttributeId;
        

        public getPosition(): [number, number];
        public getPosition(d: number): number;
        public getPosition(d?: number): [number, number] | number {
            if (typeof d == 'number') {
                return this.attributeList.get(this._position)[d];
            }

            return this.attributeList.get(this._position);
        }

        protected setPosition(position: [number, number]): void {
            this.attributeList.set(this._position, position);
        }

        public getPositionPrecise(): [number, number];
        public getPositionPrecise(d: number): number;
        public getPositionPrecise(d?: number): [number, number] | number {
            if (typeof d == 'number') {
                return this.attributeList.get(this._positionPrecise)[d];
            }

            return this.attributeList.get(this._positionPrecise);
        }

        public setPositionPrecise(position: [number, number]): void {
            this.attributeList.set(this._positionPrecise, position);
            this.setPosition([Math.floor(position[0]), Math.floor(position[1])]);
        }

        public getPlayerId(): number {
            return this.attributeList.get(this._playerId);
        }

        public setPlayerId(playerId: number): void {
            this.attributeList.set(this._playerId, playerId);
        }

        public getMinSpeed(): number {
            return this.attributeList.get(this._minSpeed);
        }

        public setMinSpeed(speed: number): void {
            this.attributeList.set(this._minSpeed, speed);
        }

        public getMaxSpeed(): number {
            return this.attributeList.get(this._maxSpeed);
        }

        public setMaxSpeed(speed: number): void {
            this.attributeList.set(this._maxSpeed, speed);
        }

        public getSize(): [number, number];
        public getSize(d: number): number;
        public getSize(d?: number): [number, number] | number {

            if (d) {
                return this.attributeList.get(this._size)[d];
            }
            return this.attributeList.get(this._size);
        }

        public setSize(size: [number, number]): void {
            this.attributeList.set(this._size, size);
        }

        public getMoveDirection(): MoveDirection {
            return this.attributeList.get(this._moveDirection);
        }

        public setMoveDirection(direction: MoveDirection): void {
            this.attributeList.set(this._moveDirection, direction);
        }
    }
}