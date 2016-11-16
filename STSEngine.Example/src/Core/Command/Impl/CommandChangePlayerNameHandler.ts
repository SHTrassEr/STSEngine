namespace STSEngine.Example {

    export class CommandChangePlayerNameHandler extends STSEngine.CommandHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            super(worldServiceList);
        }

        protected executeCommand(command: CommandChangePlayerName): void {
            var client = this.worldServiceList.getClientListService().getTyped<IClient>(command.getPlayerId(), Client);
            if (client) {
                client.setName(command.getPlayerName());
            }
        }

        protected isValidCommand(command: CommandChangePlayerName): boolean {
            if (command.getInitiatorId() === 0) {
                return true;
            }

            return command.getPlayerId() === command.getInitiatorId();
        }

        protected isValidCommandType(command: ICommand): boolean {
            return command instanceof CommandChangePlayerName;
        }
    }
}