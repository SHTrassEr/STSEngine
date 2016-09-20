namespace STSEngine {
    "use strict";

    export class CommandStartMoveObjectImpl implements ICommandHandler {

        public execute(world: IWorld, command: ICommand): void {
            var processType = this.getProcessType(command);
            var processAttributeList = this.createProcessAttributeList(processType, command);
            var processListService = world.getProcessListService();
            var process = processListService.createProcess(processAttributeList);
            var processDispatcher = world.getProcessDispatcher();
            processDispatcher.init(world, process);
        }


        protected getProcessType(command: ICommand): ProcessType {
            switch (command.getCommandType()) {
                case CommandType.StartMoveDown:
                    return ProcessType.MoveDown;
                case CommandType.StartMoveUp:
                    return ProcessType.MoveUp;
                case CommandType.StartMoveLeft:
                    return ProcessType.MoveLeft;
                case CommandType.StartMoveRight:
                    return ProcessType.MoveRight;
            }
        }

        protected createProcessAttributeList(processType: ProcessType, command: ICommand): IKeyValuePair[] {
            var processAttributeList: IKeyValuePair[] = [];
            processAttributeList.push(new KeyValuePairImpl(AttributeType.ProcessType, processType));
            var objectId = command.getAttribute(AttributeType.ObjectId);
            processAttributeList.push(new KeyValuePairImpl(AttributeType.ObjectId, objectId));
            return processAttributeList;
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