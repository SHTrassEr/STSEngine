namespace STSEngine.Example {

    export class CommandMoveObjectStopHandler extends STSEngine.CommandHandler {

        protected processInitializer: ProcessInitializer;

        constructor(processInitializer: ProcessInitializer) {
            super();
            this.processInitializer = processInitializer;
        }

        protected executeCommand(world: IWorld, command: CommandMoveObjectStop): Iterable<IProcess> {
            let processListService = world.getServiceList().getProcessListService();
            let objectId = command.getObjectId();
            let moveDirection = command.getMoveDirection();
            let processList = processListService.getAll(p => ((p instanceof ProcessMoveObject) && (<ProcessMoveObject>p).getObjectId() === objectId) && (<ProcessMoveObject>p).getMoveDirection() === moveDirection);
            for (let process of processList) {
                this.finishProcess(world, process);
            }

            return null;
        }

        protected isValidCommand(world: IWorld, command: CommandMoveObjectStop): boolean {
            let playerId = command.getInitiatorId();
            if (playerId > 0) {
                let objectId = command.getObjectId();
                let object: ObjectPlayer = <any>world.getServiceList().getObjectListService().get(objectId);
                if (object instanceof ObjectPlayer) {
                    return (object).getPlayerId() == playerId;
                }

            }

            return command.getInitiatorId() === 0;
        }

        protected isValidCommandType(world: IWorld, command: ICommand): boolean {
            return command instanceof CommandMoveObjectStop;
        }
    }
}