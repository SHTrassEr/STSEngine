namespace STSEngine.Example {

    export class CommandMoveObjectStartHandler extends STSEngine.CommandHandler {

        protected processInitializer: ProcessInitializer;

        constructor(processInitializer: ProcessInitializer) {
            super();
            this.processInitializer = processInitializer;
        }

        protected executeCommand(world: IWorld, command: CommandMoveObjectStart): void {
            var process = this.processInitializer.createMove();
            process.setObjectId(command.getObjectId());
            process.setMoveDirection(command.getMoveDirection());
            this.startProcess(world, process);
        }


        protected isValidCommand(world: IWorld, command: CommandMoveObjectStart): boolean {
            let playerId = command.getInitiatorId();
            if (playerId > 0) {
                let objectId = command.getObjectId();
                let object = this.getObject<ObjectPlayer>(world, objectId, ObjectPlayer);
                if (object) {
                    return (object).getPlayerId() == playerId;
                }
            }

            return command.getInitiatorId() === 0;
        }


        protected isValidCommandType(world: IWorld, command: ICommand): boolean {
            return command instanceof CommandMoveObjectStart;
        }

    }
}