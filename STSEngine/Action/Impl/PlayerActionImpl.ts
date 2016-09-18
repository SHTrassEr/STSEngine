module STSEngine {
    "use strict";

    export class PlayerActionImpl implements IPlayerAction {

        protected commandListService: ICommandListService;
        protected playerId: number;

        constructor(playerId: number, commandListService: ICommandListService) {
            this.playerId = playerId;
            this.commandListService = commandListService;
        }

        public getPlayerId(): number {
            return this.playerId;
        }

        protected createAttributeList(): IKeyValuePair[] {
            return [];
        }

        protected addObjectIdAttribute(attributeList: IKeyValuePair[], objectId: number): void {
            attributeList.push(new KeyValuePairImpl(AttributeType.ObjectId, objectId));
        }

        public startMoveRight(objectId: number): void {
            var attributeList = this.createAttributeList();
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(STSEngine.CommandType.StartMoveRight, this.playerId, attributeList);
        }

        public startMoveLeft(objectId: number): void {
            var attributeList = this.createAttributeList();
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(STSEngine.CommandType.StartMoveLeft, this.playerId, attributeList);
        }

        public startMoveUp(objectId: number): void {
            var attributeList = this.createAttributeList();
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(STSEngine.CommandType.StartMoveUp, this.playerId, attributeList);
        }

        public startMoveDown(objectId: number): void {
            var attributeList = this.createAttributeList();
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(STSEngine.CommandType.StartMoveDown, this.playerId, attributeList);
        }

        public stopMoveRight(objectId: number): void {
            var attributeList = this.createAttributeList();
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(STSEngine.CommandType.StopMoveRight, this.playerId, attributeList);
        }

        public stopMoveLeft(objectId: number): void {
            var attributeList = this.createAttributeList();
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(STSEngine.CommandType.StopMoveLeft, this.playerId, attributeList);
        }

        public stopMoveUp(objectId: number): void {
            var attributeList = this.createAttributeList();
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(STSEngine.CommandType.StopMoveUp, this.playerId, attributeList);
        }

        public stopMoveDown(objectId: number): void {
            var attributeList = this.createAttributeList();
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(STSEngine.CommandType.StopMoveDown, this.playerId, attributeList);
        }


    }
}