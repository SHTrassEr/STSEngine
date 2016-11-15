namespace STSEngine.Example {

    export class CommandFireHandler extends STSEngine.CommandHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            super(worldServiceList);
        }

        protected executeCommand(command: CommandFire): void {
            var process = this.worldServiceList.getProcessInitializer().createFire();
            process.setObjectId(command.getObjectId());
            this.startProcess(process);
        }


        protected isValidCommand(command: CommandFire): boolean {
            let playerId = command.getInitiatorId();
            if (playerId > 0) {
                let objectId = command.getObjectId();
                let object = this.worldServiceList.getItemListService().getTyped<ItemPlayer>(objectId, ItemPlayer);
                if (object) {
                    return (object).getPlayerId() == playerId;
                }
            }

            return command.getInitiatorId() === 0;
        }


        protected isValidCommandType(command: ICommand): boolean {
            return command instanceof CommandFire;
        }

    }
}