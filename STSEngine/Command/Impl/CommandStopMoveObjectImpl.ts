module STSEngine {
    "use strict";

    export class CommandStopMoveObjectImpl implements ICommandHandler {

        public execute(world: IWorld, command: ICommand): void {
            var processListService = world.getProcessListService();
            var objectId = command.getAttribute(AttributeType.ObjectId);
            var processType = this.getProcessType(command);
            var process = processListService.getFirst(p => (p.getObjectId() === objectId && p.getProcessType() === processType));
            var processDispatcher = world.getProcessDispatcher();
            processDispatcher.finish(world, process);
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
    }
}