namespace STSEngine {

    export interface IWorldAttributeList extends IterableKeyValuePair {
        getMoveStepSize(): number;
        getTickLength(): number;

        getLastProcessId(): number;
        setLastProcessId(id: number);

        getLastObjectId(): number;
        setLastObjectId(id: number);
    }
}