namespace STSEngine {

    export class PlayerAction implements IPlayerAction {

        protected commandListService: ICommandListService;
        protected onActionHandler: (playerAction: IPlayerAction) => void;

        constructor() {
            this.commandListService = new CommandListService();
        }

        public getCommandKeyValuePairList(): [number, any][][] {
            return this.commandListService.getCommandKeyValuePairList();
        }

        public clear(): void {
            this.commandListService.clear();
        }

        public setOnAction(handler: (playerAction: IPlayerAction) => void) {
            this.onActionHandler = handler;
        }

        protected onAction() {
            if (this.onActionHandler) {
                this.onActionHandler(this);
            }
        }
    }
}

//export = STSEngine;

