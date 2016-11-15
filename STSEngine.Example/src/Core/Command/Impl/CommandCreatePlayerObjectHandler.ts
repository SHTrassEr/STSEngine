namespace STSEngine.Example {

    export class CommandCreatePlayerObjectHandler extends STSEngine.CommandHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            super(worldServiceList);
        }

        protected executeCommand(command: CommandCreatePlayerObject): void {
            var process = this.worldServiceList.getProcessInitializer().createCreatePlayerObject();
            process.setPlayerId(command.getPlayerId());
            this.startProcess(process);
        }

        protected isValidCommand(command: CommandCreatePlayerObject): boolean {
            return command.getPlayerId() === 0;
        }

        protected isValidCommandType(command: ICommand): boolean {
            return command instanceof CommandCreatePlayerObject;
        }
    }
}