namespace STSEngine {

    export class CommandRegisterPlayer  implements ICommandHandler {

        public execute(world: IWorld, command: ICommand): void {

            var objectAttributeList = this.createObjectAttributeList(world, command);
            var processAttributeList = this.createProcessAttributeList(world, objectAttributeList);
            var processListService = world.getProcessListService();
            var process = processListService.createProcess(processAttributeList);
            var processDispatcher = world.getProcessDispatcher();
            processDispatcher.init(world, process);
        }

        protected createObjectAttributeList(world: IWorld, command: ICommand): IKeyValuePair[] {
            var newPlayerId = command.getAttribute(AttributeType.NewPlayerId);
            var objectAttributeList: IKeyValuePair[] = [];
            objectAttributeList.push(new KeyValuePair(AttributeType.PlayerId, newPlayerId));
            objectAttributeList.push(new KeyValuePair(AttributeType.Position, new STSEngine.Point(0, 0)));
            return objectAttributeList;
        }

        protected createProcessAttributeList(world: IWorld, objectAttributeList: IKeyValuePair[]): IKeyValuePair[] {
            var processAttributeList: IKeyValuePair[] = [];
            processAttributeList.push(new KeyValuePair(AttributeType.ProcessType, ProcessType.CreateObject));
            processAttributeList.push(new KeyValuePair(AttributeType.ObjectAttributeList, objectAttributeList));
            return processAttributeList;
        }

        public isValid(world: IWorld, command: ICommand): boolean {
            return command.getPlayerId() === 0;
        }
    }
}