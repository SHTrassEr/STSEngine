namespace STSEngine {

    export interface IPlayerAction {
        getPlayerId(): number;

        setOnAction(handler: () => void);
        getCommandKeyValuePairList(): IKeyValuePair[][];
        clear(): void;

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