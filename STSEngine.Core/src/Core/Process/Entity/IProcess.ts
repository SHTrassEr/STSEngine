namespace STSEngine.Core {

    export interface IProcess extends IEntity { 

        getInitStep(): number;
        setInitStep(initStep: number): void

        getFinishStep(): number;
        setFinishStep(finishStep: number): void

        getStatus(): ProcessStatus;
        setStatus(processStatus: ProcessStatus): void;

        getAttributeList(): IAttributeList;
    }
}