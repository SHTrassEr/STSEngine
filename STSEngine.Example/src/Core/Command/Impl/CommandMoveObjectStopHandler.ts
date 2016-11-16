/// <reference path="CommandHandler.ts" />

namespace STSEngine.Example {

    export class CommandMoveObjectStopHandler extends CommandHandler {

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
            return command instanceof CommandMoveObjectStop;
        }
    }
}