namespace STSEngine {

    export class CommandCreateObject implements ICommandHandler {

        public execute(world: IWorld, command: ICommand): void {

            let objectAttributeList = this.getObjectAttributeList(command);
            let processAttributeList = this.createProcessAttributeList(world, objectAttributeList);
            let processListService = world.getProcessListService();
            let process = processListService.createProcess(processAttributeList);
            let processDispatcher = world.getProcessDispatcher();
            processDispatcher.init(world, process);
        }

        protected getObjectAttributeList(command: ICommand): IKeyValuePair[] {
            let objectAttributeList = command.get(AttributeType.ObjectAttributeList);
            return objectAttributeList;
        }

        protected createProcessAttributeList(world: IWorld, objectAttributeList: IKeyValuePair[]): IKeyValuePair[] {
            let processAttributeList: IKeyValuePair[] = [];
            processAttributeList.push(new KeyValuePair(AttributeType.ProcessType, ProcessType.CreateObject));
            processAttributeList.push(new KeyValuePair(AttributeType.ObjectAttributeList, objectAttributeList));
            return processAttributeList;
        }

        public isValid(world: IWorld, command: ICommand): boolean {
            return command.getPlayerId() === 0;
        }
    }
}