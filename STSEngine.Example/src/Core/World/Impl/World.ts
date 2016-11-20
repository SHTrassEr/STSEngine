namespace STSEngine.Example {

    export class World extends STSEngine.World implements IWorld {

        protected worldAttributeList: IWorldAttributeList;
        protected itemListService: IItemListService;
        protected processListService: IProcessListService;
        protected clientListService: IClientListService;
        protected entityFactory: IEntityFactory;

        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected collisionService: ICollisionService;
        protected physicsEngine: IPhysicsEngine;

        constructor(worldAttributeList: WorldAttributeList) {
            super(worldAttributeList);

            this.entityFactory = new EntityFactory(this.initEntity.bind(this));
            this.initEntityFactory(this.entityFactory);

            
            this.itemListService = new ItemListService();

            this.processListService = new ProcessListService();
            this.clientListService = new ClientListService();
            this.collisionService = new CollisionService(this.worldAttributeList, this.itemListService, this.clientListService);

            this.commandDispatcher = new CommandDispatcher(this);
            this.processDispatcher = new ProcessDispatcher(this);
            this.physicsEngine = new PhysicsEngine(this);
        }

        protected initEntityFactory(entityFactory: IEntityFactory) {
            super.initEntityFactory(entityFactory);
            entityFactory.add(CommandApplyForce);
            entityFactory.add(CommandChangeClientName);
            entityFactory.add(CommandCreateClientItemTank);
            entityFactory.add(CommandFire);
            entityFactory.add(CommandInitWorld);
            entityFactory.add(CommandRegisterClient);


            entityFactory.add(ItemBullet);
            entityFactory.add(ItemTank);
            entityFactory.add(ItemWall);


            entityFactory.add(ProcessCreateClientItemTank);
            entityFactory.add(ProcessFire);
            entityFactory.add(ProcessMoveItem);
        }

        protected initEntity(entity: IEntity) {
            if (entity instanceof Item || entity instanceof Process) {
                if (!entity.getId()) {
                    entity.setId(this.getItemId());
                }
            }
        }


        public getWorldAttributeList(): IWorldAttributeList {
            return this.worldAttributeList;
        }

        public getEntityFactory(): IEntityFactory {
            return this.entityFactory;
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

        public getCollisionService(): ICollisionService {
            return this.collisionService;
        }

        public getClientListService(): IClientListService {
            return this.clientListService;
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