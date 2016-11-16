namespace STSEngine {

    export class ProcessDispatcher implements IProcessDispatcher {

        protected processHandlerList: IProcessHandler[];

        public execute(process: IProcess): void {
            let processStatus = process.getStatus();
            if (processStatus === ProcessStatus.Executing) {
                let handler = this.getProcessHandler(process);
                handler.execute(process);
            }
        }

        public init(process: IProcess): void {
            let processStatus = process.getStatus();
            if (processStatus === ProcessStatus.Init) {
                let handler = this.getProcessHandler(process);
                handler.init(process);
            }
        }

        public finish(process: IProcess): void {
            let processStatus = process.getStatus();
            if (processStatus !== ProcessStatus.Finished) {
                let handler = this.getProcessHandler(process);
                handler.finish(process);
            }
        }

        protected getProcessHandler(process: IProcess): IProcessHandler {
            return this.processHandlerList[process.getType()];
        }
    }
}