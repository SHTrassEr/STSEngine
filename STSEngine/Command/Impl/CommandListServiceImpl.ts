
module STSEngine {
    "use strict";

    export class CommandListServiceImpl implements ICommandListService {
        protected commandList: ICommand[];
        protected filterService: IFilterService<ICommand>;

        constructor() {
            this.commandList = [];
        }

        public getCommandList(): ICommand[] {
            return this.commandList;
        }

        public createCommand(commandType: CommandType, attributeList?: Map<string, any> | IKeyValuePair[]): ICommand {
            var command = new CommandImpl(commandType, attributeList);
            this.commandList.push(command);
            return command;
        }

        public clear(): void {
            this.commandList = [];
        }

        public getAll(condition: (item: ICommand) => boolean): ICommand[] {
            return this.filterService.getAll(this.commandList, condition);
        }

        public getFirst(condition: (item: ICommand) => boolean): ICommand {
            return this.filterService.getFirst(this.commandList, condition);
        }
    }
}