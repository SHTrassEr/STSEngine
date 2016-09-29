namespace STSEngine {

    export class CommandListService implements ICommandListService {
        protected commandList: ICommand[];
        protected filterService: IFilterService<ICommand>;

        constructor() {
            this.commandList = [];
        }

        public getCommandList(): ICommand[] {
            return this.commandList;
        }

        public createCommand(attributeList: IKeyValuePair[]): ICommand {
            let commandAttributeList = new AttributeList();
            commandAttributeList.setList(attributeList);
            let command = new Command(commandAttributeList);
            this.commandList.push(command);
            return command;
        }

        public setCommandList(commandList: IKeyValuePair[][]): void {
            for (let attributeList of commandList) {
                this.createCommand(attributeList);
            }
        }

        public getCommandKeyValuePairList(): IKeyValuePair[][] {
            let list: IKeyValuePair[][] = [];
            for (let command of this.commandList) {
                list.push(command.getKeyValuePairList());
            }

            return list;
        }

        public clear(): void {
            this.commandList = [];
        }

        public getAll(condition: (item: ICommand) => boolean): IterableIterator<ICommand> {
            return this.filterService.getAll(this.commandList, condition);
        }

        public getFirst(condition: (item: ICommand) => boolean): ICommand {
            return this.filterService.getFirst(this.commandList, condition);
        }
    }
}