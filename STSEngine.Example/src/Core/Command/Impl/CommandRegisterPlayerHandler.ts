namespace STSEngine.Example {

    export class CommandRegisterPlayerHandler extends STSEngine.CommandHandler {

        protected processInitializer: ProcessInitializer;

        constructor(processInitializer: ProcessInitializer) {
            super();
            this.processInitializer = processInitializer;
        }

        protected executeCommand(world: IWorld, command: CommandRegisterPlayer): void {
            var process = this.processInitializer.createCreatePlayerObject();
            process.setPlayerId(command.getPlayerId());
            this.startProcess(world, process);
        }

        protected isValidCommand(world: IWorld, command: CommandRegisterPlayer): boolean {
            return command.getInitiatorId() === 0;
        }

        protected isValidCommandType(world: IWorld, command: ICommand): boolean {
            return command instanceof CommandRegisterPlayer;
        }
    }
}