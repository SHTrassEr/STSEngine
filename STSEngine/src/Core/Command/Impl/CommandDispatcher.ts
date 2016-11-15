namespace STSEngine {

    export class CommandDispatcher implements ICommandDispatcher {

        protected commandHandlerList: ICommandHandler[];

        constructor() {
            this.commandHandlerList = [];
        }

        public execute(command: ICommand): void {
            let handler = this.commandHandlerList[command.getType()];
            if (handler.isValid(command)) {
                handler.execute(command);
            }
        }
    }

}