namespace STSEngine {

    export class PlayerAction implements IPlayerAction {

        protected commandListService: ICommandListService;
        protected playerId: number;
        protected onActionHandler: (playerAction: IPlayerAction) => void;

        constructor(playerId: number) {
            this.commandListService = new CommandListService();
            this.playerId = playerId;
        }

        public getPlayerId(): number {
            return this.playerId;
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

