module STSEngine {
    "use strict";

    export interface IWorld {
        getSettings(): IWorldSettings;

        getObjectStateListService(): IObjectListService;

    }

}