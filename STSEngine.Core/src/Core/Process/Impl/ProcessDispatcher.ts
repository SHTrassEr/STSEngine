namespace STSEngine.Core {

    export class ProcessDispatcher implements IProcessDispatcher {

        protected processHandlerList: Map<string, IProcessHandler> = new Map<string, IProcessHandler> ();

        public execute(process: IProcess): void {
            let processStatus = process.getStatus();
            if (processStatus === ProcessStatus.Executing) {
                let handler = this.getHandler(process);
                handler.execute(process);
            }
        }

        public init(process: IProcess): void {
            let processStatus = process.getStatus();
            if (processStatus === ProcessStatus.Init) {
                let handler = this.getHandler(process);
                handler.init(process);
            }
        }

        public finish(process: IProcess): void {
            let processStatus = process.getStatus();
            if (processStatus !== ProcessStatus.Finished) {
                let handler = this.getHandler(process);
                handler.finish(process);
            }
        }

        protected getHandler(process: IProcess): IProcessHandler {
            let handler = this.processHandlerList.get(process.getType());
            if (handler) {
                return handler;
            }

            throw new Error();
        }
    }
}