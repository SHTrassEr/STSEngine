namespace STSEngine.Core {

    export interface ICommandListService extends IFilterable<ICommand>  {
        getCommandList(): ICommand[];
        add(commahd: ICommand): void;
        setCommandList(commandList: Iterable<ICommand>): void;
        getCommandKeyValuePairList(): [number, any][][];
        clear(): void;
    }
}