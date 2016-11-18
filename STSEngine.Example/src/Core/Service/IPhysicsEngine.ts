namespace STSEngine.Example {

    export interface IPhysicsEngine {
        getEngine(): Matter.Engine;
        update(delta: number): void;
    }
}