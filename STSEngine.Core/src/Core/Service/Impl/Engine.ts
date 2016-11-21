namespace STSEngine.Core {

    export class Engine implements IEngine {
        protected world: IWorld;
        protected processListService: IProcessListService;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected commandListService: ICommandListService;

        private onBeforeUpdate = new LiteEvent<IEventEngine>();
        private onAfterUpdate = new LiteEvent<IEventEngine>();   
        
        constructor(world: IWorld, commandListService: ICommandListService) {
            this.world = world;
            this.commandListService = commandListService;
            this.processListService = world.getProcessListService();
            this.processDispatcher = world.getProcessDispatcher();
            this.commandDispatcher = world.getCommandDispatcher();
        }

        public getWorld(): IWorld {
            return this.world;
        }

        public getCommandListService(): ICommandListService {
            return this.commandListService;
        }

        public update() {
            this.triggerEvent(this.onBeforeUpdate, this.getStep());
            this.increaseStepNumber();
            this.processCommandList();
            for (let i = 0; i < this.processListService.getProcessList().length; i++) {
                let process = this.processListService.getProcessList()[i];
                this.processDispatcher.execute(process);
            }

            this.processListService.removeFinished();
            this.triggerEvent(this.onAfterUpdate, this.getStep());
        }

        public getStep(): number {
            return this.world.getWorldAttributeList().getStepNumber();
        }

        protected increaseStepNumber(): void {
            let stepNumber: number = this.getStep() + 1;
            this.world.getWorldAttributeList().setStepNumber(stepNumber);
        }

        public getCommandList(): ICommand[] {
            return this.commandListService.getCommandList();
        }

        protected processCommandList() : void {
            let commandList = this.commandListService.getCommandList();
            for (let command of commandList) {
                this.commandDispatcher.execute(command);
            }
            this.commandListService.clear();
        }

        protected triggerEvent(event: LiteEvent<IEventEngine>, step: number) {
            if (event.getCount() > 0) {
                let e = new EventEngine(this, step);
                event.trigger(e);
            }
        }

        public beforeUpdate(): ILiteEvent<IEventEngine> {
            return this.onBeforeUpdate;

        }

        public afterUpdate(): ILiteEvent<IEventEngine> {
            return this.onAfterUpdate;
        }
    }
}