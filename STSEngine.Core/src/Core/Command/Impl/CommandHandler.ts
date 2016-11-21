namespace STSEngine.Core {

    export class CommandHandler implements ICommandHandler {

        protected world: IWorld;

        constructor(world: IWorld) {
            this.world = world;
        }

        public execute(command: ICommand): void {
            if (this.isValidCommandType(command)) {
                this.executeCommand(command);
            }
        }

        public isValid(command: ICommand): boolean {
            if (this.isValidCommandType(command)) {
                return this.isValidCommand(command);
            }

            return false;
        }

        protected executeCommand(command: ICommand) {

        }

        protected isValidCommand(command: ICommand): boolean {
            return true;
        }

        protected isValidCommandType(command: ICommand): boolean {
            return true;
        }

        protected startProcess(process: IProcess): void {
            this.world.getProcessListService().add(process);
            this.world.getProcessDispatcher().init(process);
        }

        protected finishProcess(process: IProcess): void {
            this.world.getProcessDispatcher().finish(process);
        }
    }
}