/// <reference path="CommandHandler.ts" />

namespace STSEngine.Example.Tanks {

    export class CommandApplyForceHandler extends CommandHandler {

        protected world: IWorld;

        constructor(world: IWorld) {
            super(world);
        }

        protected executeCommand(command: CommandApplyForce): void {
            let item = this.world.getItemListService().getTyped<IItemTank>(command.getItemId(), ItemTank);

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