


namespace STSEngine.Example {

    export class Engine extends STSEngine.Engine implements IEngine{

        protected world: IWorld;
        private meter: any;

        private onBeforePhysicsEngineStep = new LiteEvent<IEngine>();
        private onAfterPhysicsEngineStep = new LiteEvent<IEngine>();   

        constructor(world: IWorld, commandListService: ICommandListService) {
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


        public beforePhysicsEngineStep(): ILiteEvent<IEngine> {
            return this.onAfterPhysicsEngineStep;
        }


        public afterPhysicsEngineStep(): ILiteEvent<IEngine> {
            return this.onAfterPhysicsEngineStep;
        }
        
    }
}