namespace STSEngine.Core {

    export class Engine implements IEngine {
        protected world: IWorld;
        protected processListService: IProcessListService;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected commandListService: ICommandListService;

        private onBeforeStep = new LiteEvent<IEngine>();
        private onAfterStep = new LiteEvent<IEngine>();   
        
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

        public step() {
            this.onBeforeStep.trigger(this, this);
            this.increaseStepNumber();
            this.processCommandList();
            for (let i = 0; i < this.processListService.getProcessList().length; i++) {
                let process = this.processListService.getProcessList()[i];
                this.processDispatcher.execute(process);
            }

            this.processListService.removeFinished();

            this.onAfterStep.trigger(this, this);
        }

        protected increaseStepNumber(): void {
            let stepNumber: number = this.world.getWorldAttributeList().getStepNumber() + 1;
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

        public beforeStep(): ILiteEvent<IEngine> {
            return this.onBeforeStep;

        }

        public afterStep(): ILiteEvent<IEngine> {
            return this.onAfterStep;
        }
    }
}