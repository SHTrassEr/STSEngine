/// <reference path="CommandHandler.ts" />

namespace STSEngine.Example {

    export class CommandFireHandler extends CommandHandler {


        constructor(worldServiceList: IWorld) {
            super(worldServiceList);
        }

        protected executeCommand(command: CommandFire): void {
            var process = this.worldServiceList.getProcessInitializer().createFire();
            process.setObjectId(command.getItemId());
            process.setPosition(command.getPosition());
            this.startProcess(process);
        }


        protected isValidCommand(command: CommandFire): boolean {
            return this.isCommandInitiatorIdEqualsItemClientId(command, command.getItemId());
        }


        protected isValidCommandType(command: ICommand): boolean {
            return command instanceof CommandFire;
        }

    }
}