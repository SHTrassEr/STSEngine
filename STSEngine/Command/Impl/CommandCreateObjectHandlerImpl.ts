module STSEngine {
    "use strict";

    export class CommandCreateObjectHandlerImpl implements ICommandHandler {

        public execute(world: IWorld, command: ICommand): void {

            var objectAttributeList = this.createObjectAttributeList(world, command);
            var processAttributeList = this.createProcessAttributeList(world, objectAttributeList);
            var processListService = world.getProcessListService();
            var process = new ProcessImpl(processListService.getNewProcessId(), ProcessType.CreateObject, processAttributeList);
            processListService.addProcess(process);
            var processDispatcher = world.getProcessDispatcher();
            processDispatcher.init(world, process);
        }

        protected createObjectAttributeList(world: IWorld, command: ICommand): Map<string, any> {
            var objectAttributeList = command.getAttribute(AttributeType.ObjectAttributeList);
            return objectAttributeList;
        }

        protected createProcessAttributeList(world: IWorld, objectAttributeList: Map<string, any>): Map<string, any> {
            var processAttributeList = new Map<string, any>();
            processAttributeList.set(AttributeType.ObjectAttributeList, objectAttributeList);
            return processAttributeList;
        }
    }
}