namespace STSEngine {

    export interface IProcess extends ICommitableAttributeList {
        getId(): number;
        getProcessType(): ProcessType;
        getProcessStatus(): ProcessStatus;
        setProcessStatus(processStatus: ProcessStatus): void;

        getObjectId(): number;

    }
}