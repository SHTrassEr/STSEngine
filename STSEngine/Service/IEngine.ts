module STSEngine {
    "use strict";

    export interface IEngine {
        getWorld(): IWorld;
        step(commandList?: ICommand[]): void;
    }
}