
namespace STSEngine {
    "use strict";

    export interface ICommandListService extends IFilterable<ICommand>  {
        getCommandList(): ICommand[];
        createCommand(attributeList: IKeyValuePair[]): ICommand;
        clear(): void;
    }
}