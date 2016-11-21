namespace STSEngine.Example {

    export class World extends Core.World implements IWorld {

        protected worldAttributeList: IWorldAttributeList;
        protected itemListService: IItemListService;

        protected clientListService: IClientListService;

        protected collisionService: ICollisionService;
        protected physicsEngine: IPhysicsEngine;

        constructor(worldAttributeList: WorldAttributeList) {
            super(worldAttributeList);

            this.entityFactory = new Core.EntityFactory(this.initEntity.bind(this));
            this.initEntityFactory(this.entityFactory);


            this.itemListService = new ItemListService();

            this.processListService = new Core.ProcessListService();
            this.clientListService = new ClientListService();
            this.collisionService = new CollisionService(this.worldAttributeList, this.itemListService, this.clientListService);

            this.commandDispatcher = new CommandDispatcher(this);
            this.processDispatcher = new ProcessDispatcher(this);
            this.physicsEngine = new PhysicsEngine(this);
        }

        protected initEntityFactory(entityFactory: Core.IEntityFactory) {
            super.initEntityFactory(entityFactory);
            entityFactory.set(CommandApplyForce);
            entityFactory.set(CommandChangeClientName);
            entityFactory.set(CommandCreateClientItemTank);
            entityFactory.set(CommandFire);
            entityFactory.set(CommandInitWorld);
            entityFactory.set(CommandRegisterClient);


            entityFactory.set(ItemBullet);
            entityFactory.set(ItemTank);
            entityFactory.set(ItemWall);


            entityFactory.set(ProcessCreateClientItemTank);
            entityFactory.set(ProcessFire);
            entityFactory.set(ProcessMoveItem);
        }

        public getItemListService(): IItemListService {
            return this.itemListService;
        }

        public getClientListService(): IClientListService {
            return this.clientListService;
        }

        protected initEntity(entity: Core.IEntity) {
            if (entity instanceof Item || entity instanceof Process) {
                if (!entity.getId()) {
                    entity.setId(this.getItemId());
                }
            }
        }


        public getWorldAttributeList(): IWorldAttributeList {
            return this.worldAttributeList;
        }

        public getCollisionService(): ICollisionService {
            return this.collisionService;
        }

        public getPhysicsEngine(): IPhysicsEngine {
            return this.physicsEngine;
        }

        protected getItemId(): number {
            var id = this.worldAttributeList.getLastItemId() + 1;
            this.worldAttributeList.setLastItemId(id);
            return id;
        }
    }
}