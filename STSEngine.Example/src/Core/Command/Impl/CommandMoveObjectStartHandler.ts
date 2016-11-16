namespace STSEngine.Example {

    export class CommandMoveObjectStartHandler extends STSEngine.CommandHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            super(worldServiceList);
        }

        protected executeCommand(command: CommandMoveObjectStart): void {
            var process = this.worldServiceList.getProcessInitializer().createMoveObject();
            process.setObjectId(command.getObjectId());
            process.setMoveDirection(command.getMoveDirection());
            this.startProcess(process);
        }


        protected isValidCommand(command: CommandMoveObjectStart): boolean {
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
            return command instanceof CommandMoveObjectStart;
        }

    }
}