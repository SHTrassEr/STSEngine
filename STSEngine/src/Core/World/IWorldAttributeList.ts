namespace STSEngine {

    export interface IWorldAttributeList extends IterableKeyValuePair {
        getMoveStepSize(): number;
        getTickLength(): number;
    }
}