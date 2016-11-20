namespace STSEngine {

    export class CommandHandler implements ICommandHandler {

        protected worldServiceList: IWorld;

        constructor(worldServiceList: IWorld) {
            this.worldServiceList = worldServiceList;
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
            this.worldServiceList.getProcessListService().add(process);
            this.worldServiceList.getProcessDispatcher().init(process);
        }

        protected finishProcess(process: IProcess): void {
            this.worldServiceList.getProcessDispatcher().finish(process);
        }
    }
}