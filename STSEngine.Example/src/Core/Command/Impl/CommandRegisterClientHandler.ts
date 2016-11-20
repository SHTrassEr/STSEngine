/// <reference path="CommandHandler.ts" />

namespace STSEngine.Example {

    export class CommandRegisterClientHandler extends CommandHandler {

        protected worldServiceList: IWorld;

        constructor(worldServiceList: IWorld) {
            super(worldServiceList);
        }

        protected executeCommand(command: CommandRegisterClient): void {
            let client = new ClientActive();
            client.setName(command.getClientName());
            client.setId(command.getClientId());
            this.worldServiceList.getClientListService().add(client);

            let process = this.worldServiceList.getProcessInitializer().createCreateClientItemTank();
            process.setClientId(command.getClientId());
            this.startProcess(process);
        }

        protected isValidCommand(command: CommandRegisterClient): boolean {

            if (this.isSystemCommand(command)) {
                var client = this.worldServiceList.getClientListService().getFirst(p => p.getId() == command.getClientId());
                if (!client) {
                    return true;
                }
            }

            return false;
        }

        protected isValidCommandType(command: ICommand): boolean {
            return command instanceof CommandRegisterClient;
        }
    }
}