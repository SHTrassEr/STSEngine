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
            let initiatorId = command.getInitiatorId();
            if (initiatorId > 0) {
                let objectId = command.getObjectId();
                let object = this.worldServiceList.getItemListService().getTyped<ItemTank>(objectId, ItemTank);
                if (object) {
                    return (object).getClientId() == initiatorId;
                }
            }

            return command.getInitiatorId() === 0;
        }


        protected isValidCommandType(command: ICommand): boolean {
            return command instanceof CommandMoveObjectStart;
        }

    }
}