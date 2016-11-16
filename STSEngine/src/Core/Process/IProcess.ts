namespace STSEngine {

    export interface IProcess extends IterableKeyValuePair { 
        getId(): number;
        setId(id: number): void;

        getType(): number;
        setType(processType: number): void

        getInitStep(): number;
        setInitStep(initStep: number): void

        getFinishStep(): number;
        setFinishStep(finishStep: number): void

        getStatus(): ProcessStatus;
        setStatus(processStatus: ProcessStatus): void;

        getAttributeList(): IAttributeList;
    }
}