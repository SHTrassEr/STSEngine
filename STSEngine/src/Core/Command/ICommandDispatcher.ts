namespace STSEngine {

    export interface ICommandDispatcher {
        execute(command: ICommand): void;
    }

}