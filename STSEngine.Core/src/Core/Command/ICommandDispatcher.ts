namespace STSEngine.Core {

    export interface ICommandDispatcher {
        execute(command: ICommand): void;
    }

}