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
            this.processListService = world.getProcessListService();
            this.processDispatcher = world.getProcessDispatcher();
            this.commandDispatcher = world.getCommandDispatcher();
        }

        public getWorld(): IWorld {
            return this.world;
        }

        public step() {
            this.world.increaseStepNumber();
            this.processCommandList();
            for (let i = 0; i < this.processListService.getProcessList().length; i++) {
                let process = this.processListService.getProcessList()[i];
                this.processDispatcher.execute(this.world, process);
            }

            this.processListService.removeFinished();
        }

        public getCommandList(): ICommand[] {
            return this.commandListService.getCommandList();
        }

        protected processCommandList() {
            let commandList = this.commandListService.getCommandList();
            for (let command of commandList) {
                this.commandDispatcher.execute(this.world, command);
            }

            this.commandListService.clear();
        }
    }
}