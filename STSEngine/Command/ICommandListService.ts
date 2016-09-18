
module STSEngine {
    "use strict";

    export interface ICommandListService extends IFilterable<ICommand>  {
        getCommandList(): ICommand[];
        createCommand(commandType: CommandType, playerId: number, attributeList?: Map<string, any> | IKeyValuePair[]): ICommand;
        clear(): void;
    }
}