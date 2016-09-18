module STSEngine {
    "use strict";

    export class CommandRegisterPlayerImpl  implements ICommandHandler {

        public execute(world: IWorld, command: ICommand): void {

            var objectAttributeList = this.createObjectAttributeList(world, command);
            var processAttributeList = this.createProcessAttributeList(world, objectAttributeList);
            var processListService = world.getProcessListService();
            var process = processListService.createProcess(ProcessType.CreateObject, processAttributeList);
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

        protected createProcessAttributeList(world: IWorld, objectAttributeList: IKeyValuePair[]): Map<string, any> {
            var processAttributeList = new Map<string, any>();
            processAttributeList.set(AttributeType.ObjectAttributeList, objectAttributeList);
            return processAttributeList;
        }

        public isValid(world: IWorld, command: ICommand): boolean {
            return command.getPlayerId() === 0;
        }
    }
}