namespace STSEngine {

    export class ProcessMoveRightObject implements IProcessHandler {

        public init(world: IWorld, process: IProcess): void {
            process.setProcessStatus(ProcessStatus.Executing);
        }

        public execute(world: IWorld, process: IProcess): void {
            let objectListService = world.getObjectListService();
            let object = objectListService.get(process.getObjectId());
            let position = object.getPosition();
            let newPosition = new STSEngine.Point(position.getX() + 1, position.getY());
            object.setPosition(newPosition);
        }

        public finish(world: IWorld, process: IProcess): void {
            process.setProcessStatus(ProcessStatus.Finished);
        }
    }
}