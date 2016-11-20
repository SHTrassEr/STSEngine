namespace STSEngine {

    export class ProcessHandler implements IProcessHandler {

        protected world: IWorld;

        constructor(world: IWorld) {
            this.world = world;
        }

        public init(process: IProcess): void {
            if (this.isValidProcessType(process)) {
                this.initProcess(process);

                this.setInitStep(process);

                if (process.getStatus() === ProcessStatus.Init) {
                    process.setStatus(ProcessStatus.Executing);
                } else if (process.getStatus() === ProcessStatus.Finished) {
                    this.setFinishStep(process);
                }
            }
        }

        public execute(process: IProcess): void {
            if (this.isValidProcessType(process)) {
                this.executeProcess(process);
            }
        }

        public finish(process: IProcess): void {
            if (this.isValidProcessType(process)) {
                this.finishProcess(process);
                process.setStatus(ProcessStatus.Finished);
                this.setFinishStep(process);
            }
        }

        protected setInitStep(process: IProcess) {
            process.setInitStep(this.world.getWorldAttributeList().getStepNumber());
        }

        protected setFinishStep(process: IProcess) {
            process.setFinishStep(this.world.getWorldAttributeList().getStepNumber());
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
            this.world.getProcessListService().add(process);
            this.world.getProcessDispatcher().init(process);
        }
    }
}