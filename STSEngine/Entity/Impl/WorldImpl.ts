module STSEngine {
    "use strict";

    export class WorldImpl implements IWorld {

        private worldSettings: IWorldSettings;
        private objectListService: IObjectListService;
        private processListService: IProcessListService;

        constructor(worldSettings: IWorldSettings, objectListService: IObjectListService, processListService: IProcessListService) {
            this.worldSettings = worldSettings;
            this.objectListService = objectListService;
            this.processListService = processListService;
        }

        public getSettings(): IWorldSettings {
            return this.worldSettings;
        }

        public getObjectListService(): IObjectListService {
            return this.objectListService;
        }

        public getProcessListService(): IProcessListService {
            return this.processListService;
        }

        public step(): void {
            for (var i = 0; i < this.processListService.getProcessList().length; i++) {
                var process = this.processListService.getProcessList()[i];
                process.step();
            }
        }

    }
}