


namespace STSEngine.Example.Tanks {

    export class Engine extends Core.Engine implements IEngine{

        protected world: IWorld;
        private meter: any;

        private onBeforePhysicsEngineStep = new STSEngine.Core.LiteEvent<IEngine>();
        private onAfterPhysicsEngineStep = new STSEngine.Core.LiteEvent<IEngine>();   

        constructor(world: IWorld, commandListService: STSEngine.Core.ICommandListService) {
            super(world, commandListService);
        }

        public getWorld(): IWorld {
            return this.world;
        }

        public step() {
            super.step();

            this.onBeforePhysicsEngineStep.trigger(this, this);
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
            this.onAfterPhysicsEngineStep.trigger(this, this);
        }


        public beforePhysicsEngineStep(): STSEngine.Core.ILiteEvent<IEngine> {
            return this.onAfterPhysicsEngineStep;
        }


        public afterPhysicsEngineStep(): STSEngine.Core.ILiteEvent<IEngine> {
            return this.onAfterPhysicsEngineStep;
        }
        
    }
}