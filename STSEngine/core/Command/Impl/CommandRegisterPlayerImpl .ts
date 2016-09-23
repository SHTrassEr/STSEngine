namespace STSEngine {

    export class CommandRegisterPlayerImpl  implements ICommandHandler {

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
            objectAttributeList.push(new KeyValuePairImpl(AttributeType.PlayerId, newPlayerId));
            objectAttributeList.push(new KeyValuePairImpl(AttributeType.Position, new STSEngine.PointImpl(0, 0)));
            return objectAttributeList;
        }

        protected createProcessAttributeList(world: IWorld, objectAttributeList: IKeyValuePair[]): IKeyValuePair[] {
            var processAttributeList: IKeyValuePair[] = [];
            processAttributeList.push(new KeyValuePairImpl(AttributeType.ProcessType, ProcessType.CreateObject));
            processAttributeList.push(new KeyValuePairImpl(AttributeType.ObjectAttributeList, objectAttributeList));
            return processAttributeList;
        }

        public isValid(world: IWorld, command: ICommand): boolean {
            return command.getPlayerId() === 0;
        }
    }
}