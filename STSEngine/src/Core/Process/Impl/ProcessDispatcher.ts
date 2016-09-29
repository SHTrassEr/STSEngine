namespace STSEngine {

    export class ProcessDispatcher implements IProcessDispatcher {

        protected processHandlerList: IProcessHandler[];

        constructor() {
            this.initProcessHandlerList();
        }

        protected initProcessHandlerList() {
            this.processHandlerList = [];
            this.processHandlerList[ProcessType.CreateObject] = new ProcessCreateObject();
            this.processHandlerList[ProcessType.MoveDown] = new ProcessMoveDownObject();
            this.processHandlerList[ProcessType.MoveLeft] = new ProcessMoveLeftObject();
            this.processHandlerList[ProcessType.MoveRight] = new ProcessMoveRightObject();
            this.processHandlerList[ProcessType.MoveUp] = new ProcessMoveUpObject();
        }

        public execute(world: IWorld, process: IProcess): void {
            let processStatus = process.getProcessStatus();
            if (processStatus === ProcessStatus.Executing) {
                let handler = this.getProcessHandler(process);
                handler.execute(world, process);
            }
        }

        public init(world: IWorld, process: IProcess): void {
            let processStatus = process.getProcessStatus();
            if (processStatus === ProcessStatus.Init) {
                let handler = this.getProcessHandler(process);
                handler.init(world, process);
            }
        }

        public finish(world: IWorld, process: IProcess): void {
            let processStatus = process.getProcessStatus();
            if (processStatus !== ProcessStatus.Finished) {
                let handler = this.getProcessHandler(process);
                handler.finish(world, process);
            }
        }

        protected getProcessHandler(process: IProcess): IProcessHandler {
            return this.processHandlerList[process.getProcessType()];
        }

    }

}