namespace STSEngine.Example {

    export interface ICollisionService {
        processCollision(moveItem: IItem): void;
    }
}