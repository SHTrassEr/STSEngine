namespace STSEngine {

    export interface ICommandHandler {
        execute(command: ICommand): void;
        isValid(command: ICommand): boolean;
    }

}