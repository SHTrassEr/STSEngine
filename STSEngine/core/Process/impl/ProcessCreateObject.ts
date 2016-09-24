namespace STSEngine {

    export class ProcessCreateObject implements IProcessHandler {

        public init(world: IWorld, process: IProcess): void {
            var objectAttributeList = process.getAttribute(AttributeType.ObjectAttributeList);
            var objectListService = world.getObjectListService();
            var object = objectListService.createObject(objectAttributeList);
            process.setProcessStatus(ProcessStatus.Finished);
        }

        public execute(world: IWorld, process: IProcess): void {
        }

        public finish(world: IWorld, process: IProcess): void {
        }
    }
}