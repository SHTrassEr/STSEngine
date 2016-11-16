/// <reference path="CommandHandler.ts" />

namespace STSEngine.Example {

    export class CommandSetClientForceVectorHandler extends CommandHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            super(worldServiceList);
        }

        protected executeCommand(command: CommandSetClientForceVector): void {
            let item = this.worldServiceList.getItemListService().getTyped<IItemTank>(command.getItemId(), ItemTank);

            let clientForceVector = command.getClientForceVector();
            clientForceVector = VectorHelper.normalize(clientForceVector);
            clientForceVector = VectorHelper.multScalar(clientForceVector, item.getClientForceModifier());

            item.setClientForceVector(clientForceVector);
        }

        protected isValidCommand(command: CommandSetClientForceVector): boolean {
            return this.isCommandInitiatorIdEqualsItemClientId(command, command.getItemId());
        }

        protected isValidCommandType(command: ICommand): boolean {
            return command instanceof CommandSetClientForceVector;
        }
    }
}