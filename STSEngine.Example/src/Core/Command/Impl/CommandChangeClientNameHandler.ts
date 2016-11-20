/// <reference path="CommandHandler.ts" />

namespace STSEngine.Example {

    export class CommandChangeClientNameHandler extends CommandHandler {

        constructor(world: IWorld) {
            super(world);
        }

        protected executeCommand(command: CommandChangeClientName): void {
            var client = this.world.getClientListService().getTyped<IClient>(command.getClientId(), Client);
            if (client) {
                client.setName(command.getClientName());
            }
        }

        protected isValidCommand(command: CommandChangeClientName): boolean {
            return this.isSystemCommand(command) || (command.getClientId() === command.getInitiatorId());
        }

        protected isValidCommandType(command: ICommand): boolean {
            return command instanceof CommandChangeClientName;
        }
    }
}