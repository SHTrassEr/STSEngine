namespace STSEngine {

    export class CommandStopMoveObject implements ICommandHandler {

        public execute(world: IWorld, command: ICommand): void {
            let processListService = world.getProcessListService();
            let objectId = command.get(AttributeType.ObjectId);
            let processType = this.getProcessType(command);
            let processList = processListService.getAll(p => (p.getObjectId() === objectId && p.getProcessType() === processType));
            let processDispatcher = world.getProcessDispatcher();
            for (let process of processList) {
                processDispatcher.finish(world, process);
            }

        }

        protected getProcessType(command: ICommand): ProcessType {
            switch (command.getCommandType()) {
                case CommandType.StopMoveDown:
                    return ProcessType.MoveDown;
                case CommandType.StopMoveUp:
                    return ProcessType.MoveUp;
                case CommandType.StopMoveLeft:
                    return ProcessType.MoveLeft;
                case CommandType.StopMoveRight:
                    return ProcessType.MoveRight;
            }
        }

        public isValid(world: IWorld, command: ICommand): boolean {
            let playerId = command.getPlayerId();
            if (playerId > 0) {
                let objectId = command.get(AttributeType.ObjectId);
                let object = world.getObjectListService().get(objectId);
                return object.getPlayerId() == playerId;
            }

            return command.getPlayerId() === 0;
        }
    }
}