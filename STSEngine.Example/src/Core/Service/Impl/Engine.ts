namespace STSEngine.Example {

    export class Engine extends STSEngine.Engine {

        protected world: IWorld;

        constructor(world: IWorld, commandListService: ICommandListService) {
            super(world, commandListService);
        }

        public step() {
            super.step();
            let engine = this.world.getServiceList().getMatterEngine();
            let tickLength = this.world.getServiceList().getWorldAttributeList().getTickLength();
            //Matter.Events.trigger(engine, 'tick', <any>{ timestamp: engine.timing.timestamp });
            Matter.Engine.update(engine, tickLength);
            //Matter.Events.trigger(engine, 'afterTick', <any>{ timestamp: engine.timing.timestamp });
        }
        
    }
}