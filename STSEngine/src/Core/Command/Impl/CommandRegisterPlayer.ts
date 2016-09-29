namespace STSEngine {

    export class CommandRegisterPlayer  implements ICommandHandler {

        public execute(world: IWorld, command: ICommand): void {

            let objectAttributeList = this.createObjectAttributeList(world, command);
            let processAttributeList = this.createProcessAttributeList(world, objectAttributeList);
            let processListService = world.getProcessListService();
            let process = processListService.createProcess(processAttributeList);
            let processDispatcher = world.getProcessDispatcher();
            processDispatcher.init(world, process);
        }

        protected createObjectAttributeList(world: IWorld, command: ICommand): IKeyValuePair[] {
            let newPlayerId = command.get(AttributeType.NewPlayerId);
            let objectAttributeList: IKeyValuePair[] = [];
            objectAttributeList.push(new KeyValuePair(AttributeType.PlayerId, newPlayerId));
            objectAttributeList.push(new KeyValuePair(AttributeType.Position, new STSEngine.Point(0, 0)));
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