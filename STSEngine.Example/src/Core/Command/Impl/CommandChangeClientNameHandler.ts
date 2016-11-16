namespace STSEngine.Example {

    export class CommandChangeClientNameHandler extends STSEngine.CommandHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            super(worldServiceList);
        }

        protected executeCommand(command: CommandChangeClientName): void {
            var client = this.worldServiceList.getClientListService().getTyped<IClient>(command.getClientId(), Client);
            if (client) {
                client.setName(command.getClientName());
            }
        }

        protected isValidCommand(command: CommandChangeClientName): boolean {
            if (command.getInitiatorId() === 0) {
                return true;
            }

            return command.getClientId() === command.getInitiatorId();
        }

        protected isValidCommandType(command: ICommand): boolean {
            return command instanceof CommandChangeClientName;
        }
    }
}