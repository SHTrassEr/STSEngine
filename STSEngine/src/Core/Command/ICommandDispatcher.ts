namespace STSEngine {

    export interface ICommandDispatcher {
        execute(world: IWorld, command: ICommand): void;
    }

}