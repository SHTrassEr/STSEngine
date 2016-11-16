namespace STSEngine.Example {

    export abstract class Item extends STSEngine.Item implements IItem {
        private _position: number = ++this.lastAttributeId;
        private _positionPrecise: number = ++this.lastAttributeId;
        private _clientId: number = ++this.lastAttributeId;
        private _mass: number = ++this.lastAttributeId;
        private _frictionModifier: number = ++this.lastAttributeId;
        private _size: number = ++this.lastAttributeId;
        private _moveDirection: number = ++this.lastAttributeId;
        private _moveVector: number = ++this.lastAttributeId;
        private _forceVector: number = ++this.lastAttributeId;


        public getPosition(): [number, number];
        public getPosition(d: number): number;
        public getPosition(d?: number): [number, number] | number {
            if (typeof d == 'number') {
                return this.attributeList.get(this._position)[d];
            }

            return this.attributeList.get(this._position);
        }

        public setPosition(position: [number, number]): void {
            this.attributeList.set(this._position, position);
        }

        public getMoveVector(): [number, number];
        public getMoveVector(d: number): number;
        public getMoveVector(d?: number): [number, number] | number {
            if (d) {
                return this.attributeList.get(this._moveVector)[d];
            }

            return this.attributeList.get(this._moveVector);
        }

        public setMoveVector(moveVector: [number, number]): void {
            this.attributeList.set(this._moveVector, moveVector);
        }

        public getForceVector(): [number, number];
        public getForceVector(d: number): number;
        public getForceVector(d?: number): [number, number] | number {
            if (d) {
                return this.attributeList.get(this._forceVector)[d];
            }

            return this.attributeList.get(this._forceVector);
        }

        public setForceVector(forceVector: [number, number]): void {
            this.attributeList.set(this._forceVector, forceVector);
        }

        public getClientId(): number {
            return this.attributeList.get(this._clientId);
        }

        public setClientId(clientId: number): void {
            this.attributeList.set(this._clientId, clientId);
        }

        public getMass(): number {
            return this.attributeList.get(this._mass);
        }

        public setMass(speed: number): void {
            this.attributeList.set(this._mass, speed);
        }

        public getFrictionModifier(): number {
            return this.attributeList.get(this._frictionModifier);
        }

        public setFrictionModifier(frictionModifier: number): void {
            this.attributeList.set(this._frictionModifier, frictionModifier);
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

    export module Item {
        let lastTypeId = STSEngine.Item.LastTypeId;
    }
}