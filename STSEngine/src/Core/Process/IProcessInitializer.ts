namespace STSEngine {

    export interface IProcessInitializer extends IEntityInitializer<IProcess> {

        createProcess(attr?: Iterable<[number, any]>): IProcess;
    }
}

