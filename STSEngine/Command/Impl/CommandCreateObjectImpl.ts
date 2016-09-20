namespace STSEngine {
    "use strict";

    export class CommandCreateObjectImpl implements ICommandHandler {

        public execute(world: IWorld, command: ICommand): void {

            var objectAttributeList = this.getObjectAttributeList(command);
            var processAttributeList = this.createProcessAttributeList(world, objectAttributeList);
            var processListService = world.getProcessListService();
            var process = processListService.createProcess(processAttributeList);
            var processDispatcher = world.getProcessDispatcher();
            processDispatcher.init(world, process);
        }

        protected getObjectAttributeList(command: ICommand): IKeyValuePair[] {
            var objectAttributeList = command.getAttribute(AttributeType.ObjectAttributeList);
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