namespace STSEngine {

    export class ClientAction implements IClientAction {

        protected commandListService: ICommandListService;
        protected onActionHandler: (clientAction: IClientAction) => void;

        constructor() {
            this.commandListService = new CommandListService();
        }

        public getCommandKeyValuePairList(): [number, any][][] {
            return this.commandListService.getCommandKeyValuePairList();
        }

        public clear(): void {
            this.commandListService.clear();
        }

        public setOnAction(handler: (clientAction: IClientAction) => void) {
            this.onActionHandler = handler;
        }

        protected onAction() {
            if (this.onActionHandler) {
                this.onActionHandler(this);
            }
        }
    }
}
