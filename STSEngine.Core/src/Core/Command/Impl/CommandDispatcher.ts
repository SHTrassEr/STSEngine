namespace STSEngine.Core {

    export class CommandDispatcher implements ICommandDispatcher {

        protected commandHandlerList: Map<string, ICommandHandler> = new Map<string, ICommandHandler>();

        constructor() {
            this.commandHandlerList = new Map<string, ICommandHandler>();
        }

        public execute(command: ICommand): void {
            let handler = this.getHandler(command);
            if (handler.isValid(command)) {
                handler.execute(command);
            }
        }

        protected getHandler(command: ICommand): ICommandHandler {
            let handler = this.commandHandlerList.get(command.getType());
            if (handler) {
                return handler;
            }

            throw new Error();
        }
    }

}