module STSEngine {
    "use strict";

    export class WorldImpl implements IWorld {

        private worldSettings: IWorldSettings;
        private objectStateListService: IObjectListService;

        constructor(worldSettings: IWorldSettings, objectStateListService: IObjectListService) {
            this.worldSettings = worldSettings;
            this.objectStateListService = objectStateListService;
        }

        public getSettings(): IWorldSettings {
            return this.worldSettings;
        }

        public getObjectStateListService(): IObjectListService {
            return this.objectStateListService;
        }

    }
}