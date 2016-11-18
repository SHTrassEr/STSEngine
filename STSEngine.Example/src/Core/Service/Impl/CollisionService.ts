namespace STSEngine.Example {

    export class CollisionService implements ICollisionService {
        protected itemListService: IItemListService;
        protected worldAttributeList: IWorldAttributeList;
        protected clientListService: IClientListService;

        constructor(worldAttributeList: IWorldAttributeList, itemListService: IItemListService, clientListService: IClientListService) {

            this.clientListService = clientListService;
            this.worldAttributeList = worldAttributeList;
            this.itemListService = itemListService;
        }


    }
}