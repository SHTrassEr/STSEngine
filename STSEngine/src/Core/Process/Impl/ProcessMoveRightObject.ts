namespace STSEngine {

    export class ProcessMoveRightObject implements IProcessHandler {

        public init(world: IWorld, process: IProcess): void {
            process.setProcessStatus(ProcessStatus.Executing);
        }

        public execute(world: IWorld, process: IProcess): void {
            var objectListService = world.getObjectListService();
            var object = objectListService.getObject(process.getObjectId());
            var position = object.getPosition();
            var newPosition = new STSEngine.Point(position.getX() + 1, position.getY());
            object.setPosition(newPosition);
        }

        public finish(world: IWorld, process: IProcess): void {
            process.setProcessStatus(ProcessStatus.Finished);
        }
    }
}