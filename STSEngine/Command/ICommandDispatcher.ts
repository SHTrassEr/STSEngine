namespace STSEngine {
    "use strict";

    export interface ICommandDispatcher {
        execute(world: IWorld, command: ICommand): void;
    }

}