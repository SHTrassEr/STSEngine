namespace STSEngine {

    export interface IWorldAttributeList extends IterableKeyValuePair {
        getTickLength(): number;

        getLastProcessId(): number;
        setLastProcessId(id: number);

        getLastObjectId(): number;
        setLastObjectId(id: number);
    }
}