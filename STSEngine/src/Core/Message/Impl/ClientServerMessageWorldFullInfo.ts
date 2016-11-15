namespace STSEngine {

    export class ClientServerMessageWorldFullInfo extends ClientServerMessage {

        private _worldAttributeList: number = ++this.lastAttributeId;
        private _clientListService: number = ++this.lastAttributeId;
        private _itemListService: number = ++this.lastAttributeId;
        private _processListService: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ClientServerMessageType.WorldFullInfo);
        }

        public setWorld(world: IWorld): void {
            let serviceList = world.getServiceList();
            this.setWorldAttributeList(serviceList.getWorldAttributeList());
            this.setClientListService(serviceList.getClientListService());
            this.setItemListService(serviceList.getItemListService());
            this.setProcessListService(serviceList.getProcessListService());
        }


        public setWorldAttributeList(worldAttributeList: IWorldAttributeList) {
            this.attributeList.set(this._worldAttributeList, worldAttributeList.getList());
        }

        public getWorldAttributeList(): [number, any][] {
            return this.attributeList.get(this._worldAttributeList);
        }

        public setClientListService(clientListService: IClientListService) {
            this.attributeList.set(this._clientListService, clientListService.getList());
        }

        public getClientListService(): [number, any][][] {
            return this.attributeList.get(this._clientListService);
        }

        public setItemListService(itemListService: IItemListService) {
            this.attributeList.set(this._itemListService, itemListService.getList());
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

    export module ClientServerMessageType {
        export const WorldFullInfo = ClientServerMessageType.getNewTypeId();
    }
}