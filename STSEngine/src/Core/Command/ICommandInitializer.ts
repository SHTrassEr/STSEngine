namespace STSEngine {

    export interface ICommandInitializer extends IEntityInitializer<ICommand> {

        createCommand(attr?: Iterable<[number, any]>): ICommand
    }
}

