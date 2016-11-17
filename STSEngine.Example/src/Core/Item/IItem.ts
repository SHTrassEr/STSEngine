namespace STSEngine.Example {

    export interface IItem extends STSEngine.IItem {

        getPosition(): [number, number];
        getPosition(d: number): number;
        setPosition(position: [number, number]): void;

        getMoveVector(): [number, number];
        getMoveVector(d: number): number;
        setMoveVector(moveVector: [number, number]): void;

        getForceVector(): [number, number];
        getForceVector(d: number): number;
        setForceVector(moveVector: [number, number]): void;

        getSize(): [number, number];

        getFrictionModifier(): number;
        setFrictionModifier(frictionModifier: number): void;

        getMass(): number;
        setMass(speed: number): void;

        getClientId(): number;
        setClientId(clientId: number);

        getBody(): Matter.Body;
    }
}