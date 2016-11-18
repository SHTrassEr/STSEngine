namespace STSEngine.Example {

    export abstract class Item extends STSEngine.Item implements IItem {

        private _clientId: number = ++this.lastAttributeId;
        private _mass: number = ++this.lastAttributeId;
        private _forceScale: number = ++this.lastAttributeId;
        private _size: number = ++this.lastAttributeId;
        private _moveVector: number = ++this.lastAttributeId;
        private _force: number = ++this.lastAttributeId;
        private _bodyJSON: number = ++this.lastAttributeId;

        protected body: Matter.Body;

        constructor(attributeList: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);

            let body = this.createBody();

            if (kvpList && this.getBodyJSON()) {
                let o = CircularJSON.parse(this.getBodyJSON());
                if (!o.inertia) {
                    o.inertia = Infinity;
                }

                if (!o.mass) {
                    o.mass = 40;
                }
                
                Matter.Body.set(body, o);
            }

            this.setBody(body);
        }

        protected abstract createBody(): Matter.Body;


        public getPosition(): IVector {
            return this.body.position;
        }

        public setPosition(position: IVector): void {
            Matter.Body.setPosition(this.body, position);
        }

        public getForce(): IVector {
            return VectorHelper.parse(this.attributeList.get(this._force));
        }

        public setForce(force: IVector): void {
            this.attributeList.set(this._force, force);
        }

        public getForceScale(): number {
            return this.attributeList.get(this._forceScale, 1);
        }

        public setForceScale(scale: number): void {
            this.attributeList.set(this._forceScale, scale);
        }

        public applyForce(): void {
            let force = this.getForce();
            VectorHelper.multScalar(force, this.getForceScale());
            Matter.Body.applyForce(this.body, this.body.position, force);
        }

        public getVelocity(): IVector {
            return new Vector(this.body.velocity);
        }

        public setVelocity(velocity: IVector): void {
            Matter.Body.setVelocity(this.body, velocity);
        }
        

        public getClientId(): number {
            return this.attributeList.get(this._clientId);
        }

        public setClientId(clientId: number): void {
            this.attributeList.set(this._clientId, clientId);
        }

        public getMass(): number {
            return this.body.mass;
        }

        public setMass(mass: number): void {
            Matter.Body.setMass(this.body, mass);
        }

        public getFriction(): number {
            return this.body.friction;
        }

        public setFriction(friction: number): void {
            this.body.friction = friction
        }

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