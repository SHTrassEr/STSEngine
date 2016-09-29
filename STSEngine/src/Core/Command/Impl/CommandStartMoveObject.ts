namespace STSEngine {

    export class CommandStartMoveObject implements ICommandHandler {

        public execute(world: IWorld, command: ICommand): void {
            let processType = this.getProcessType(command);
            let processAttributeList = this.createProcessAttributeList(processType, command);
            let processListService = world.getProcessListService();
            let process = processListService.createProcess(processAttributeList);
            let processDispatcher = world.getProcessDispatcher();
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
            let processAttributeList: IKeyValuePair[] = [];
            processAttributeList.push(new KeyValuePair(AttributeType.ProcessType, processType));
            let objectId = command.get(AttributeType.ObjectId);
            processAttributeList.push(new KeyValuePair(AttributeType.ObjectId, objectId));
            return processAttributeList;
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