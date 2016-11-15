namespace STSEngine {

    export class ProcessHandler implements IProcessHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            this.worldServiceList = worldServiceList;
        }

        public init(process: IProcess): void {
            if (this.isValidProcessType(process)) {
                this.initProcess(process);
            }
        }

        public execute(process: IProcess): void {
            if (this.isValidProcessType(process)) {
                this.executeProcess(process);
                process.setProcessExecCount(process.getProcessExecCount() + 1);
            }
        }

        public finish(process: IProcess): void {
            if (this.isValidProcessType(process)) {
                this.finishProcess(process);
            }
        }

        protected initProcess(process: IProcess): void {

        }

        protected executeProcess(process: IProcess): void {

        }

        protected finishProcess(process: IProcess): void {

        }

        protected isValidProcessType(command: IProcess): boolean {
            return true;
        }

        protected startProcess(process: IProcess): void {
            this.worldServiceList.getProcessListService().add(process);
            this.worldServiceList.getProcessDispatcher().init(process);
        }
    }
}