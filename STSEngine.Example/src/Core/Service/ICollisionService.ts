namespace STSEngine.Example {

    export interface ICollisionService {
        processCollision(moveObject: IObject, newPosition: [number, number]): void;
    }
}