namespace STSEngine.Example {

    export interface ICollisionService {
        processCollision(moveItem: IItem, newPosition: [number, number]): void;
    }
}