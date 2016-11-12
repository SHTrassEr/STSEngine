namespace STSEngine {

    export interface IProcess extends IterableKeyValuePair { 
        getId(): number;
        setId(id: number): void;

        getProcessType(): number;
        setProcessType(processType: number): void

        getProcessExecCount(): number;
        setProcessExecCount(execCount: number): void

        getProcessStatus(): ProcessStatus;
        setProcessStatus(processStatus: ProcessStatus): void;

        getAttributeList(): IAttributeList;
    }
}