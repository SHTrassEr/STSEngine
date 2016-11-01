namespace STSEngine {

    export interface IPlayerAction {
        getPlayerId(): number;
        setOnAction(handler: () => void);
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
    }
}