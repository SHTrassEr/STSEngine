
namespace STSEngine.Example.Tanks {

    export class Engine extends Core.Engine implements IEngine{

        protected world: IWorld;
        private meter: any;

        private onBeforePhysicsEngineUpdate = new STSEngine.Core.LiteEvent<IEngine>();
        private onAfterPhysicsEngineUpdate = new STSEngine.Core.LiteEvent<IEngine>();   

        constructor(world: IWorld, commandListService: STSEngine.Core.ICommandListService) {
            super(world, commandListService);
        }

        public getWorld(): IWorld {
            return this.world;
        }

        public update() {
            super.update();

            this.onBeforePhysicsEngineUpdate.trigger(this);
            let engine = this.world.getPhysicsEngine();
            let tickLength = this.world.getWorldAttributeList().getTickLength();
            engine.update(tickLength);
            /*engine.update(tickLength);
            engine.update(tickLength);
            engine.update(tickLength);
            engine.update(tickLength);
/*            engine.update(tickLength);
            engine.update(tickLength);
            engine.update(tickLength);
            engine.update(tickLength);
            engine.update(tickLength);*/
            this.onAfterPhysicsEngineUpdate.trigger(this);
        }


        public beforePhysicsEngineUpdate(): STSEngine.Core.ILiteEvent<IEngine> {
            return this.onAfterPhysicsEngineUpdate;
        }


        public afterPhysicsEngineUpdate(): STSEngine.Core.ILiteEvent<IEngine> {
            return this.onAfterPhysicsEngineUpdate;
        }
        
    }
}