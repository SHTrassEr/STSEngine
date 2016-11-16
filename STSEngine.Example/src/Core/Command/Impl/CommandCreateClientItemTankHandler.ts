namespace STSEngine.Example {

    export class CommandCreateClientItemTankHandler extends STSEngine.CommandHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            super(worldServiceList);
        }

        protected executeCommand(command: CommandCreateClientItemTank): void {
            var process = this.worldServiceList.getProcessInitializer().createCreateClientItemTank();
            process.setClientId(command.getClientId());
            this.startProcess(process);
        }

        protected isValidCommand(command: CommandCreateClientItemTank): boolean {
            return command.getInitiatorId() === 0;
        }

        protected isValidCommandType(command: ICommand): boolean {
            return command instanceof CommandCreateClientItemTank;
        }
    }
}