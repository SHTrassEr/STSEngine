module STSEngine {
    "use strict";

    export class EngineImpl implements IEngine {
        protected world: IWorld;
        protected objectListService: IObjectListService;
        protected processListService: IProcessListService;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;
        protected worldSettings: IWorldSettings;

        constructor(world: IWorld) {
            this.world = world;
            this.objectListService = world.getObjectListService();
            this.processListService = world.getProcessListService();
            this.worldSettings = world.getSettings();
            this.processDispatcher = world.getProcessDispatcher();
            this.commandDispatcher = world.getCommandDispatcher();
        }

        public getWorld(): IWorld {
            return this.world;
        }

        public step(commandList?: ICommand[]) {
            this.world.increaseStepNumber();
            this.processCommandList(commandList);
            for (var i = 0; i < this.processListService.getProcessList().length; i++) {
                var process = this.processListService.getProcessList()[i];
                this.processDispatcher.execute(this.world, process);
            }
        }

        protected processCommandList(commandList?: ICommand[]) {
            if (commandList) {
                for (var command of commandList) {
                    this.commandDispatcher.execute(this.world, command);
                }
            }
        }
    }
}