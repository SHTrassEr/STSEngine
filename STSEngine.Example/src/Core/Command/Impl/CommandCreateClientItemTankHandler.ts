/// <reference path="CommandHandler.ts" />

namespace STSEngine.Example {

    export class CommandCreateClientItemTankHandler extends CommandHandler {

        protected worldServiceList: IWorld;

        constructor(worldServiceList: IWorld) {
            super(worldServiceList);
        }

        protected executeCommand(command: CommandCreateClientItemTank): void {
            var process = this.worldServiceList.getProcessInitializer().createCreateClientItemTank();
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