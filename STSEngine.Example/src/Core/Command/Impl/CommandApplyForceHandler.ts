/// <reference path="CommandHandler.ts" />

namespace STSEngine.Example {

    export class CommandApplyForceHandler extends CommandHandler {

        protected worldServiceList: IWorld;

        constructor(worldServiceList: IWorld) {
            super(worldServiceList);
        }

        protected executeCommand(command: CommandApplyForce): void {
            let item = this.worldServiceList.getItemListService().getTyped<IItemTank>(command.getItemId(), ItemTank);

            let force = command.getForce();
            VectorHelper.normalize(force);
            item.setForce(force);
        }

        protected isValidCommand(command: CommandApplyForce): boolean {
            return this.isCommandInitiatorIdEqualsItemClientId(command, command.getItemId());
        }

        protected isValidCommandType(command: ICommand): boolean {
            return command instanceof CommandApplyForce;
        }
    }
}