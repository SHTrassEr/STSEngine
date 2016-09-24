namespace STSEngine {

    export class CommandStopMoveObject implements ICommandHandler {

        public execute(world: IWorld, command: ICommand): void {
            var processListService = world.getProcessListService();
            var objectId = command.getAttribute(AttributeType.ObjectId);
            var processType = this.getProcessType(command);
            var processList = processListService.getAll(p => (p.getObjectId() === objectId && p.getProcessType() === processType));
            var processDispatcher = world.getProcessDispatcher();
            for (var process of processList) {
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
            var playerId = command.getPlayerId();
            if (playerId > 0) {
                var objectId = command.getAttribute(AttributeType.ObjectId);
                var object = world.getObjectListService().getObject(objectId);
                return object.getPlayerId() == playerId;
            }

            return command.getPlayerId() === 0;
        }
    }
}