namespace STSEngine {

    export interface IWorldAttributeList extends IEntity {

        getTickLength(): number;
        setTickLength(tickLength: number): void;

        getLastProcessId(): number;
        setLastProcessId(id: number): void;

        getLastItemId(): number;
        setLastItemId(id: number): void;

        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
    }
}