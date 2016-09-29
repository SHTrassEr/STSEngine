namespace STSEngine {

    export class ProcessMoveUpObject implements IProcessHandler {

        public init(world: IWorld, process: IProcess): void {
            process.setProcessStatus(ProcessStatus.Executing);
        }

        public execute(world: IWorld, process: IProcess): void {
            let objectListService = world.getObjectListService();
            let object = objectListService.get(process.getObjectId());
            let position = object.getPosition();
            let newPosition = new STSEngine.Point(position.getX(), position.getY() + 1);
            object.setPosition(newPosition);
        }

        public finish(world: IWorld, process: IProcess): void {
            process.setProcessStatus(ProcessStatus.Finished);
        }
    }
}