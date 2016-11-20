namespace STSEngine.Example {

    export class CommandHandler extends STSEngine.CommandHandler {

        protected world: IWorld;

        protected isSystemCommand(command: ICommand) {
            return command.getInitiatorId() === 0;
        }

        protected isCommandInitiatorIdEqualsItemClientId(command: ICommand, itemId: number) {
            let initiatorId = command.getInitiatorId();
            if (initiatorId > 0) {
                let object = this.world.getItemListService().get(itemId);
                if (object) {
                    return (object).getClientId() == initiatorId;
                }
            }

            return false;
        }
    }
}