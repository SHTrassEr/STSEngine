namespace STSEngine.Example {

    export interface IPlayerAction extends STSEngine.IPlayerAction {

        startMoveRight(objectId: number): void;
        startMoveLeft(objectId: number): void;
        startMoveUp(objectId: number): void;
        startMoveDown(objectId: number): void;
        stopMoveRight(objectId: number): void;
        stopMoveLeft(objectId: number): void;
        stopMoveUp(objectId: number): void;
        stopMoveDown(objectId: number): void;

        changePlayerName(playerId: number, name: string): void;
    }
}