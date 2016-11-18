namespace STSEngine.Example {

    export interface IItem extends STSEngine.IItem {

        getPosition(): IVector;
        setPosition(position: IVector): void;

        getForce(): IVector;
        setForce(force: IVector): void;
        applyForce(): void;

        getForceScale(): number;
        setForceScale(scale: number): void;

        getVelocity(): IVector;
        setVelocity(velocity: IVector): void;

        getFriction(): number;
        setFriction(frictionModifier: number): void;

        getMass(): number;
        setMass(speed: number): void;

        getClientId(): number;
        setClientId(clientId: number);

        getBody(): Matter.Body;
    }
}