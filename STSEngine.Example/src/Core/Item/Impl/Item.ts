namespace STSEngine.Example {

    export abstract class Item extends STSEngine.Item implements IItem {

        private _clientId: number = ++this.lastAttributeId;
        private _mass: number = ++this.lastAttributeId;
        private _frictionModifier: number = ++this.lastAttributeId;
        private _size: number = ++this.lastAttributeId;
        private _moveVector: number = ++this.lastAttributeId;
        private _forceVector: number = ++this.lastAttributeId;
        private _bodyJSON: number = ++this.lastAttributeId;

        protected body: Matter.Body;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);

            let body = this.createBody();

            if (kvpList && this.getBodyJSON()) {
                let o = CircularJSON.parse(this.getBodyJSON());
                o.inertia = Infinity;
                Matter.Body.set(body, o);
            }

            this.setBody(body);
        }

        protected abstract createBody(): Matter.Body;


        public getPosition(): [number, number];
        public getPosition(d: number): number;
        public getPosition(d?: number): [number, number] | number {
            if (typeof d == 'number') {
                if (d === 0) {
                    return this.body.position.x;
                } else if (d === 1) {
                    return this.body.position.y;
                }
            }

            return [this.body.position.x, this.body.position.y];
        }

        public setPosition(position: [number, number]): void {
            Matter.Body.setPosition(this.body, {x: position[0], y: position[1]});
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

        public abstract getSize(): [number, number];

        public getBody(): Matter.Body {
            return this.body;
        }

        protected setBody(body: Matter.Body): void {
            this.body = body;
        }

        public getBodyJSON(): string {
            return this.attributeList.get(this._bodyJSON);
        }

        protected setBodyJSON(bodyJSON: string): void {
            this.attributeList.set(this._bodyJSON, bodyJSON);
        }

        public getList(): [number, any][] {
            this.setBodyJSON(CircularJSON.stringify(this.body));
            return super.getList();
        }

    }

    export module Item {
        let lastTypeId = STSEngine.Item.LastTypeId;
    }
}