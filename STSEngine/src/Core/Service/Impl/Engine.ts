namespace STSEngine {

    export class Engine implements IEngine {
        protected world: IWorld;
        protected processListService: IProcessListService;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected commandListService: ICommandListService;
        
        constructor(world: IWorld, commandListService: ICommandListService) {
            this.world = world;
            this.commandListService = commandListService;
            this.processListService = world.getServiceList().getProcessListService();
            this.processDispatcher = world.getServiceList().getProcessDispatcher();
            this.commandDispatcher = world.getServiceList().getCommandDispatcher();
        }

        public getWorld(): IWorld {
            return this.world;
        }

        public step() {
            this.increaseStepNumber();
            this.processCommandList();
            for (let i = 0; i < this.processListService.getProcessList().length; i++) {
                let process = this.processListService.getProcessList()[i];
                this.processDispatcher.execute(process);
            }

            this.processListService.removeFinished();
        }

        protected increaseStepNumber(): void {
            let stepNumber: number = this.world.getAttributeList().getStepNumber() + 1;
            this.world.getAttributeList().setStepNumber(stepNumber);
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
    }
}