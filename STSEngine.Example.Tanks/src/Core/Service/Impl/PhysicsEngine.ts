namespace STSEngine.Example.Tanks {

    export class PhysicsEngine implements IPhysicsEngine {

        protected engine: Matter.Engine;
        protected world: IWorld;

        constructor(world: IWorld) {
            this.world = world;
            let engine = this.createEngine(world.getWorldAttributeList());
            this.initEngine(engine, world.getWorldAttributeList());
            this.engine = engine;
            this.initItemListService(engine, world.getItemListService());

        }

        public getEngine(): Matter.Engine {
            return this.engine;
        }   

        public update(delta: number): void {
            Matter.Engine.update(this.engine, delta);
        }

        protected addItem(event: Core.IEventEntityListService<IItem>): void {
            let item = event.getEntity();
            item.getBody().id = item.getId();
            Matter.World.add(this.engine.world, item.getBody());
        }

        protected removeItem(event: Core.IEventEntityListService<IItem>): void {
            let item = event.getEntity();
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
            Matter.Events.on(engine, "collisionActive", this.onCollisionActive.bind(this));

        }

        protected beforeUpdate(e: Matter.IEventTimestamped<Matter.Engine>): void {

            let itemList = this.world.getItemListService().getIterator();
            for (let item of itemList) {
                item.applyForce();
            }
        }

        protected afterUpdate(e: Matter.IEventTimestamped<Matter.Engine>): void {

            let itemList = this.world.getItemListService().getIterator();
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

        protected onCollisionActive(e: Matter.IEventCollision<Matter.Engine>): void {
            this.onCollisionStart(e);
        }

        protected onCollisionStart(e: Matter.IEventCollision<Matter.Engine>): void {
            if (e.pairs.length > 1) {
                let cc = 1;
            }
            for (let p of e.pairs) {
                let bodyA = this.world.getItemListService().get(p.bodyA.id);
                let bodyB = this.world.getItemListService().get(p.bodyB.id);
                
                if (bodyA instanceof ItemBullet && bodyB instanceof ItemTank) {
                    this.processCollisionTankBullet(p, bodyB, bodyA);
                    continue;
                }

                if (bodyB instanceof ItemBullet && bodyA instanceof ItemTank) {
                    this.processCollisionTankBullet(p, bodyA, bodyB);
                    continue;
                }


                if (bodyA instanceof ItemBullet) {
                    this.world.getItemListService().remove(bodyA.getId());
                }

                if (bodyB instanceof ItemBullet) {
                    this.world.getItemListService().remove(bodyB.getId());
                }
            }
        }

        protected processCollisionTankBullet(p: Matter.IPair, tank: ItemTank, bullet: ItemBullet) {
            if (tank.getClientId() != bullet.getClientId()) {

                let clientListService = this.world.getClientListService();

                let bulletClient = clientListService.getTyped<IClientActive>(bullet.getClientId(), ClientActive);
                let tankClient = clientListService.getTyped<IClientActive>(tank.getClientId(), ClientActive);

                bulletClient.setScore(bulletClient.getScore() + 10);
                tankClient.setScore(tankClient.getScore() - 10);
                
                this.world.getItemListService().remove(bullet.getId());
            } else {
                p.isActive = false;
            }
        }
        
    }
}