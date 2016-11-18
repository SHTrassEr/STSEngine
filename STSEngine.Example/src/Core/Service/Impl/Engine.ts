namespace STSEngine.Example {

    export class Engine extends STSEngine.Engine {

        protected world: IWorld;

        constructor(world: IWorld, commandListService: ICommandListService) {
            super(world, commandListService);
        }

        public step() {
            super.step();
            let engine = this.world.getServiceList().getPhysicsEngine();
            let tickLength = this.world.getServiceList().getWorldAttributeList().getTickLength();
            engine.update(tickLength);
        }
        
    }
}