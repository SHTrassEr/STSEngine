namespace STSEngine.Example {

    export class CommandRegisterPlayerHandler extends STSEngine.CommandHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            super(worldServiceList);
        }

        protected executeCommand(command: CommandRegisterPlayer): void {
            let client = new Client();
            client.setName(command.getPlayerName());
            client.setId(command.getPlayerId());
            this.worldServiceList.getClientListService().add(client);

            let process = this.worldServiceList.getProcessInitializer().createCreatePlayerObject();
            process.setPlayerId(command.getPlayerId());
            this.startProcess(process);
        }

        protected isValidCommand(command: CommandRegisterPlayer): boolean {
            let playerId = command.getPlayerId();
            if (command.getInitiatorId() === 0) {
                var player = this.worldServiceList.getClientListService().getFirst(p => p.getId() == playerId);
                if (!player) {
                    return true;
                }
            }

            return false;
        }

        protected isValidCommandType(command: ICommand): boolean {
            return command instanceof CommandRegisterPlayer;
        }
    }
}