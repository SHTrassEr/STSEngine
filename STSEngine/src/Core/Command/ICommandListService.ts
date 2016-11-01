namespace STSEngine {

    export interface ICommandListService extends IFilterable<ICommand>  {
        getCommandList(): ICommand[];
        add(commahd: ICommand): void;
        setCommandList(commandList: Iterable<Iterable<[number, any]>>): void;
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
    }
}