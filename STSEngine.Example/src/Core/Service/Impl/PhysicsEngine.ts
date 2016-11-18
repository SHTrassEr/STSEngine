namespace STSEngine.Example {

    export class PhysicsEngine implements IPhysicsEngine {

        protected engine: Matter.Engine;
        protected itemListService: IItemListService;

        constructor(worldAttributeList: IWorldAttributeList, itemListService: IItemListService) {
            this.itemListService = itemListService;
            let engine = this.createEngine(worldAttributeList);
            this.initEngine(engine, worldAttributeList);
            this.engine = engine;
            this.initItemListService(engine, itemListService);

        }

        public getEngine(): Matter.Engine {
            return this.engine;
        }   

        public update(delta: number): void {
            Matter.Engine.update(this.engine, delta);
        }

        protected addItem(itemListService: IItemListService, item: IItem): void {
            item.getBody().id = item.getId();
            Matter.World.add(this.engine.world, item.getBody());
        }

        protected removeItem(itemListService: IItemListService, item: IItem): void {
            Matter.World.remove(this.engine.world, item.getBody());
        }

        protected initItemListService(engine: Matter.Engine, itemListService: IItemListService): void {
            itemListService.beforeAdd().on(this.addItem.bind(this));
            itemListService.beforeRemove().on(this.removeItem.bind(this));
        }

        protected createEngine(worldAttributeList: IWorldAttributeList): Matter.Engine {
            return Matter.Engine.create();
        }

        protected initEngine(engine: Matter.Engine, worldAttributeList: IWorldAttributeList): void {
            engine.world.gravity.x = 0;
            engine.world.gravity.y = 0;

            this.initEvents(engine, worldAttributeList);
        }

        protected initEvents(engine: Matter.Engine, worldAttributeList: IWorldAttributeList) {
            Matter.Events.on(engine, "collisionStart", this.onCollisionStart.bind(this));
        }

        protected onCollisionStart(e: Matter.IEventCollision<Matter.Engine>): void {
            for (let p of e.pairs) {
                let bodyA = this.itemListService.get(p.bodyA.id);
                let bodyB = this.itemListService.get(p.bodyB.id);
                
                if (bodyA instanceof ItemBullet && bodyB instanceof ItemTank) {
                    this.processCollisionTankBullet(p, bodyB, bodyA);
                    return;
                }

                if (bodyB instanceof ItemBullet && bodyA instanceof ItemTank) {
                    this.processCollisionTankBullet(p, bodyA, bodyB);
                    return;
                }


                if (bodyA instanceof ItemBullet) {
                    this.itemListService.remove(bodyA.getId());
                }

                if (bodyB instanceof ItemBullet) {
                    this.itemListService.remove(bodyB.getId());
                }
            }
        }

        protected processCollisionTankBullet(p: Matter.IPair, tank: ItemTank, bullet: ItemBullet) {
            if (tank.getClientId() != bullet.getClientId()) {
                this.itemListService.remove(bullet.getId());
            } else {
                p.isActive = false;
            }
        }
        
    }
}