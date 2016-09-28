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

        protected createAttributeList(commandType: CommandType): IKeyValuePair[] {
            var list: IKeyValuePair[] = [];
            list.push(new KeyValuePair(AttributeType.PlayerId, this.playerId));
            list.push(new KeyValuePair(AttributeType.CommandType, commandType));
            return list;
        }

        protected addObjectIdAttribute(attributeList: IKeyValuePair[], objectId: number): void {
            attributeList.push(new KeyValuePair(AttributeType.ObjectId, objectId));
        }

        public startMoveRight(objectId: number): void {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StartMoveRight);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
            this.onAction();
        }

        public startMoveLeft(objectId: number): void {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StartMoveLeft);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
            this.onAction();
        }

        public startMoveUp(objectId: number): void {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StartMoveUp);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
            this.onAction();
        }

        public startMoveDown(objectId: number): void {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StartMoveDown);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
            this.onAction();
        }

        public stopMoveRight(objectId: number): void {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StopMoveRight);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
            this.onAction();
        }

        public stopMoveLeft(objectId: number): void {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StopMoveLeft);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
            this.onAction();
        }

        public stopMoveUp(objectId: number): void {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StopMoveUp);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
            this.onAction();
        }

        public stopMoveDown(objectId: number): void {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StopMoveDown);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
            this.onAction();
        }

        public getCommandKeyValuePairList(): IKeyValuePair[][] {
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

