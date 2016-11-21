namespace STSEngine.Core {

    export abstract class World implements IWorld {
        protected worldAttributeList: IWorldAttributeList;
        protected itemListService: IItemListService;
        protected processListService: IProcessListService;
        protected clientListService: IClientListService;

        protected entityFactory: IEntityFactory;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;

        constructor(worldAttributeList: WorldAttributeList) {
            this.worldAttributeList = worldAttributeList;
        }

        protected initEntityFactory(entityFactory: IEntityFactory) {
            entityFactory.set(ClientServerMessageCommandList);
            entityFactory.set(ClientServerMessageInit);
            entityFactory.set(ClientServerMessageRequestAuthentication);
            entityFactory.set(ClientServerMessageResponseAuthentication);
            entityFactory.set(ClientServerMessageStep);
            entityFactory.set(ClientServerMessageStepList);
            entityFactory.set(ClientServerMessageWorldFullInfo);
        }

        public getWorldAttributeList(): IWorldAttributeList {
            return this.worldAttributeList;
        }

        public getProcessDispatcher(): IProcessDispatcher {
            return this.processDispatcher;
        }

        public getCommandDispatcher(): ICommandDispatcher {
            return this.commandDispatcher;
        }

        public getItemListService(): IItemListService {
            return this.itemListService;
        }

        public getProcessListService(): IProcessListService {
            return this.processListService;
        }

        public getClientListService(): IClientListService {
            return this.clientListService;
        }

        public getEntityFactory(): IEntityFactory {
            return this.entityFactory;
        }

        protected getItemId(): number {
            var id = this.worldAttributeList.getLastItemId() + 1;
            this.worldAttributeList.setLastItemId(id);
            return id;
        }

        protected getProcessId(): number {
            var id = this.worldAttributeList.getLastProcessId() + 1;
            this.worldAttributeList.setLastProcessId(id);
            return id;
        }
    }
}