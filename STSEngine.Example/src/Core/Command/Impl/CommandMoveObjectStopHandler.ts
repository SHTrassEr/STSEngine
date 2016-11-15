namespace STSEngine.Example {

    export class CommandMoveObjectStopHandler extends STSEngine.CommandHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            super(worldServiceList);
        }

        protected executeCommand(command: CommandMoveObjectStop): Iterable<IProcess> {
            let processListService = this.worldServiceList.getProcessListService();
            let objectId = command.getObjectId();
            let moveDirection = command.getMoveDirection();
            let processList = processListService.getAll(p => ((p instanceof ProcessMoveObject) && (<ProcessMoveObject>p).getObjectId() === objectId) && (<ProcessMoveObject>p).getMoveDirection() === moveDirection);
            for (let process of processList) {
                this.finishProcess(process);
            }

            return null;
        }

        protected isValidCommand(command: CommandMoveObjectStop): boolean {
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
            return command instanceof CommandMoveObjectStop;
        }
    }
}