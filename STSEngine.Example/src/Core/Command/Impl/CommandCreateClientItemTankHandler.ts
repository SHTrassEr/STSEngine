/// <reference path="CommandHandler.ts" />

namespace STSEngine.Example {

    export class CommandCreateClientItemTankHandler extends CommandHandler {

        protected world: IWorld;

        constructor(world: IWorld) {
            super(world);
        }

        protected executeCommand(command: CommandCreateClientItemTank): void {
            var process = this.world.getEntityFactory().create<ProcessCreateClientItemTank>(ProcessCreateClientItemTank);
            process.setClientId(command.getClientId());
            this.startProcess(process);
        }

        protected isValidCommand(command: CommandCreateClientItemTank): boolean {
            return this.isSystemCommand(command);
        }

        protected isValidCommandType(command: ICommand): boolean {
            return command instanceof CommandCreateClientItemTank;
        }
    }
}