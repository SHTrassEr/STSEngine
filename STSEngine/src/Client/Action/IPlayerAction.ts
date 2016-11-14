namespace STSEngine {

    export interface IPlayerAction {
        setOnAction(handler: () => void);
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
    }
}