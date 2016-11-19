namespace STSEngine.Example {

    export class PhysicsEngine implements IPhysicsEngine {

        protected engine: Matter.Engine;
        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            this.worldServiceList = worldServiceList;
            let engine = this.createEngine(worldServiceList.getWorldAttributeList());
            this.initEngine(engine, worldServiceList.getWorldAttributeList());
            this.engine = engine;
            this.initItemListService(engine, worldServiceList.getItemListService());

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
            let engine = Matter.Engine.create();
            engine.velocityIterations = 4;
            return engine;
        }

        protected initEngine(engine: Matter.Engine, worldAttributeList: IWorldAttributeList): void {
            engine.world.gravity.x = 0;
            engine.world.gravity.y = 0;

            this.initEvents(engine, worldAttributeList);
        }

        protected initEvents(engine: Matter.Engine, worldAttributeList: IWorldAttributeList) {
            Matter.Events.on(engine, "beforeUpdate", this.beforeUpdate.bind(this));
            Matter.Events.on(engine, "afterUpdate", this.afterUpdate.bind(this));
            Matter.Events.on(engine, "collisionStart", this.onCollisionStart.bind(this));
        }

        protected beforeUpdate(e: Matter.IEventTimestamped<Matter.Engine>): void {
            let itemList = this.worldServiceList.getItemListService().getIterator();
            for (let item of itemList) {
                item.applyForce();
            }
        }

        protected afterUpdate(e: Matter.IEventTimestamped<Matter.Engine>): void {
            let itemList = this.worldServiceList.getItemListService().getIterator();
            for (let item of itemList) {
                item.setPosition(VectorHelper.round(item.getPosition()));

                let velocity = item.getVelocity();
                if (Math.abs(velocity.x) < 0.1) {
                    velocity.x = 0;
                }

                if (Math.abs(velocity.y) < 0.1) {
                    velocity.y = 0;
                }

                item.setVelocity(VectorHelper.round(velocity));
            }
        }

        protected onCollisionStart(e: Matter.IEventCollision<Matter.Engine>): void {
            for (let p of e.pairs) {
                let bodyA = this.worldServiceList.getItemListService().get(p.bodyA.id);
                let bodyB = this.worldServiceList.getItemListService().get(p.bodyB.id);
                
                if (bodyA instanceof ItemBullet && bodyB instanceof ItemTank) {
                    this.processCollisionTankBullet(p, bodyB, bodyA);
                    return;
                }

                if (bodyB instanceof ItemBullet && bodyA instanceof ItemTank) {
                    this.processCollisionTankBullet(p, bodyA, bodyB);
                    return;
                }


                if (bodyA instanceof ItemBullet) {
                    this.worldServiceList.getItemListService().remove(bodyA.getId());
                }

                if (bodyB instanceof ItemBullet) {
                    this.worldServiceList.getItemListService().remove(bodyB.getId());
                }
            }
        }

        protected processCollisionTankBullet(p: Matter.IPair, tank: ItemTank, bullet: ItemBullet) {
            if (tank.getClientId() != bullet.getClientId()) {

                let clientListService = this.worldServiceList.getClientListService();

                let bulletClient = clientListService.getTyped<IClientActive>(bullet.getClientId(), ClientActive);
                let tankClient = clientListService.getTyped<IClientActive>(tank.getClientId(), ClientActive);

                bulletClient.setScore(bulletClient.getScore() + 10);
                tankClient.setScore(tankClient.getScore() - 10);
                
                this.worldServiceList.getItemListService().remove(bullet.getId());
            } else {
                p.isActive = false;
            }
        }
        
    }
}