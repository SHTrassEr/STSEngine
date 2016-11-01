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

        public add(command: ICommand): void {
            this.commandList.push(command);
        }

        public setCommandList(commandList: Iterable<ICommand>): void {
            for (let command of commandList) {
                this.add(command);
            }
        }

        public getCommandKeyValuePairList(): [number, any][][] {
            let list: [number, any][][] = [];
            for (let command of this.commandList) {
                list.push(command.getList());
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