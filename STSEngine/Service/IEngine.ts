module STSEngine {
    "use strict";

    export interface IEngine {
        getWorld(): IWorld;
        update(commandList: ICommand[]): void;
    }
}