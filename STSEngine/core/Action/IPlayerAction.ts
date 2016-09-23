namespace STSEngine {

    export interface IPlayerAction {
        getPlayerId(): number;

        startMoveRight(objectId: number): void;
        startMoveLeft(objectId: number): void;
        startMoveUp(objectId: number): void;
        startMoveDown(objectId: number): void;
        stopMoveRight(objectId: number): void;
        stopMoveLeft(objectId: number): void;
        stopMoveUp(objectId: number): void;
        stopMoveDown(objectId: number): void;
    }
}