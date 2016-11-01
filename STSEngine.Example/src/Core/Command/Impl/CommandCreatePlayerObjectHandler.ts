namespace STSEngine.Example {

    export class CommandCreatePlayerObjectHandler extends STSEngine.CommandHandler {

        protected processInitializer: ProcessInitializer;

        constructor(processInitializer: ProcessInitializer) {
            super();
            this.processInitializer = processInitializer;
        }

        protected executeCommand(world: IWorld, command: CommandCreatePlayerObject): void {
            var process = this.processInitializer.createCreatePlayerObject();
            process.setPlayerId(command.getPlayerId());
            this.startProcess(world, process);
        }

        protected isValidCommand(world: IWorld, command: CommandCreatePlayerObject): boolean {
            return command.getPlayerId() === 0;
        }

        protected isValidCommandType(world: IWorld, command: ICommand): boolean {
            return command instanceof CommandCreatePlayerObject;
        }
    }
}