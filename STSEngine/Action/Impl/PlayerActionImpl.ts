/// <reference path="../IPlayerAction.ts" />

namespace STSEngine {
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

        protected createAttributeList(commandType: CommandType): IKeyValuePair[] {
            var list: IKeyValuePair[] = [];
            list.push(new KeyValuePairImpl(AttributeType.PlayerId, this.playerId));
            list.push(new KeyValuePairImpl(AttributeType.CommandType, commandType));
            return list;
        }

        protected addObjectIdAttribute(attributeList: IKeyValuePair[], objectId: number): void {
            attributeList.push(new KeyValuePairImpl(AttributeType.ObjectId, objectId));
        }

        public startMoveRight(objectId: number): void {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StartMoveRight);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
        }

        public startMoveLeft(objectId: number): void {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StartMoveLeft);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
        }

        public startMoveUp(objectId: number): void {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StartMoveUp);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
        }

        public startMoveDown(objectId: number): void {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StartMoveDown);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
        }

        public stopMoveRight(objectId: number): void {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StopMoveRight);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
        }

        public stopMoveLeft(objectId: number): void {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StopMoveLeft);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
        }

        public stopMoveUp(objectId: number): void {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StopMoveUp);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
        }

        public stopMoveDown(objectId: number): void {
            var attributeList = this.createAttributeList(STSEngine.CommandType.StopMoveDown);
            this.addObjectIdAttribute(attributeList, objectId);
            this.commandListService.createCommand(attributeList);
        }

    }    
}

//export = STSEngine;

