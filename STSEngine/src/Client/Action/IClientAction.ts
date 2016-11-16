namespace STSEngine {

    export interface IClientAction {
        setOnAction(handler: () => void);
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
    }
}