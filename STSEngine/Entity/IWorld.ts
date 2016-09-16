module STSEngine {
    "use strict";

    export interface IWorld {
        getSettings(): IWorldSettings;
        getObjectListService(): IObjectListService;
        getProcessListService(): IProcessListService;

        step(): void;
    }
}