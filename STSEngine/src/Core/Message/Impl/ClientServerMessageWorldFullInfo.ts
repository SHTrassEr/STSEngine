/// <reference path="ClientServerMessage.ts" />

namespace STSEngine {

    export class ClientServerMessageWorldFullInfo extends ClientServerMessage {

        private _worldAttributeList: number = ++this.lastAttributeId;
        private _clientListService: number = ++this.lastAttributeId;
        private _itemListService: number = ++this.lastAttributeId;
        private _processListService: number = ++this.lastAttributeId;


        public setWorld(world: IWorld): void {
            this.setWorldAttributeList(world.getWorldAttributeList());
            this.setClientListService(world.getClientListService());
            this.setItemListService(world.getItemListService());
            this.setProcessListService(world.getProcessListService());
        }


        public setWorldAttributeList(worldAttributeList: IWorldAttributeList) {
            this.attributeList.set(this._worldAttributeList, worldAttributeList.getList());
        }

        public getWorldAttributeList(): [number, any][] {
            return this.attributeList.get(this._worldAttributeList);
        }

        public setClientListService(clientListService: IClientListService) {
            this.attributeList.set(this._clientListService, clientListService.serialize());
        }

        public getClientListService(): [number, any][][] {
            return this.attributeList.get(this._clientListService);
        }

        public setItemListService(itemListService: IItemListService) {
            this.attributeList.set(this._itemListService, itemListService.serialize());
        }

        public getItemListService(): [number, any][][] {
            return this.attributeList.get(this._itemListService);
        }

        public setProcessListService(processListService: IProcessListService) {
            this.attributeList.set(this._processListService, processListService.getList());
        }

        public getProcessListService(): [number, any][][] {
            return this.attributeList.get(this._processListService);
        }
    }

    export module ClientServerMessageWorldFullInfo {
        export const type = ModuleInfo.name + '.' + ClientServerMessageWorldFullInfo.name;
    }
}