
module STSEngine {
    "use strict";

    export interface ICommandListService extends IFilterable<ICommand>  {
        getCommandList(): ICommand[];
        createCommand(commandType: CommandType, attributeList?: Map<string, any> | IKeyValuePair[]): ICommand;
        clear(): void;
    }
}