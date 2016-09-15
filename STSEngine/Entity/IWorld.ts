module STSEngine {
    "use strict";

    export interface IWorld {
        getSettins(): IWorldSettings;

        getObjectStateListService(): IObjectListService;

    }

}