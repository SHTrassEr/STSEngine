namespace STSEngine {

    export interface IProcess extends IAttributeList {
        getId(): number;
        getProcessType(): ProcessType;
        getProcessStatus(): ProcessStatus;
        setProcessStatus(processStatus: ProcessStatus): void;

        getObjectId(): number;

    }
}