namespace STSEngine {

    export interface ICommandHandler {
        execute(world: IWorld, command: ICommand): void;
        isValid(world: IWorld, command: ICommand): boolean;
    }

}