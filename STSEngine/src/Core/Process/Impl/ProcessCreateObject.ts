namespace STSEngine {

    export class ProcessCreateObject implements IProcessHandler {

        public init(world: IWorld, process: IProcess): void {
            let objectAttributeList = process.get(AttributeType.ObjectAttributeList);
            let objectListService = world.getObjectListService();
            let object = objectListService.create(objectAttributeList);
            process.setProcessStatus(ProcessStatus.Finished);
        }

        public execute(world: IWorld, process: IProcess): void {
        }

        public finish(world: IWorld, process: IProcess): void {
        }
    }
}