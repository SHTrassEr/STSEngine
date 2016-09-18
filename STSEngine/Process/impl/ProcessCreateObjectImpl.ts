module STSEngine {
    "use strict";

    export class ProcessCreateObjectImpl implements IProcessHandler {

        public init(world: IWorld, process: IProcess): void {
            var objectAttributeList = process.getAttribute(AttributeType.ObjectAttributeList);
            var objectListService = world.getObjectListService();
            var objectId = objectListService.getNewObjectId();
            var object = new STSEngine.ObjectImpl(objectId, objectAttributeList);
            objectListService.addObject(object);
            process.setProcessStatus(ProcessStatus.Finished);
        }

        public execute(world: IWorld, process: IProcess): void {
        }

        public finish(world: IWorld, process: IProcess): void {
        }
    }
}