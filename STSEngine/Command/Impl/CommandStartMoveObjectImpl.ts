﻿module STSEngine {
    "use strict";

    export class CommandStartMoveObjectImpl implements ICommandHandler {

        public execute(world: IWorld, command: ICommand): void {
            var processAttributeList = this.createProcessAttributeList(world, command);
            var processListService = world.getProcessListService();
            var processType = this.getProcessType(command);
            var process = processListService.createProcess(processType, processAttributeList);
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

        protected createProcessAttributeList(world: IWorld, command: ICommand): Map<string, any> {
            var objectId = command.getAttribute(AttributeType.ObjectId);
            var processAttributeList = new Map<string, any>();
            processAttributeList.set(AttributeType.ObjectId, objectId);
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