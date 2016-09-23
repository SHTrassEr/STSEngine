namespace STSEngine {

    export class CommandListServiceImpl implements ICommandListService {
        protected commandList: ICommand[];
        protected filterService: IFilterService<ICommand>;

        constructor() {
            this.commandList = [];
        }

        public getCommandList(): ICommand[] {
            return this.commandList;
        }

        public createCommand(attributeList: IKeyValuePair[]): ICommand {
            var command = new CommandImpl(attributeList);
            this.commandList.push(command);
            return command;
        }

        public setCommandList(commandList: IKeyValuePair[][]): void {
            for (var attributeList of commandList) {
                this.createCommand(attributeList);
            }
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