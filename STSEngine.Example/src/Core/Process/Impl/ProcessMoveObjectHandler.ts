namespace STSEngine.Example {

    export class ProcessMoveObjectHandler extends STSEngine.ProcessHandler {

        protected processInitializer: ProcessInitializer;
        protected objectInitializer: ObjectInitializer;
        protected collisionService: ICollisionService;
        protected worldAttributeList: WorldAttributeList;

        constructor(worldAttributeList: WorldAttributeList, processInitializer: ProcessInitializer, objectInitializer: ObjectInitializer, collisionService: ICollisionService) {
            super();
            this.worldAttributeList = worldAttributeList;
            this.processInitializer = processInitializer;
            this.objectInitializer = objectInitializer;
            this.collisionService = collisionService;
        }

        public initProcess(world: IWorld, process: ProcessMoveObject): void {
            process.setProcessStatus(ProcessStatus.Executing);

            if (!process.getMoveDirection()) {
                throw new Error('Init process invalid state: move direction is not defined ' + process.getId() + ' ' + process.getObjectId());
            }
        }

        public executeProcess(world: IWorld, process: ProcessMoveObject): void {
            var object = world.getServiceList().getObjectListService().get(process.getObjectId());
            if (object) {
                this.moveObject((<IObjectRectangle>object), process.getMoveDirection(), process.getProcessExecCount());
            } else {
                process.setProcessStatus(ProcessStatus.Finished);
            }
        }

        protected moveObject(object: IObjectRectangle, direction: MoveDirection, execCount: number): void {
            let position = object.getPositionPrecise();
            var speed = object.getMaxSpeed();

            if (execCount < 50) {
                speed =  Math.floor((speed * (execCount + 10) / 20) * 100) / 100;
            } else if (execCount >= 50) {
                speed = speed * 3;
            }

            let newPosition: [number, number] = null;

            switch (direction) {
                case MoveDirection.Down:
                    newPosition = [position[0], position[1] + speed];
                    break;
                case MoveDirection.Up:
                    newPosition = [position[0], position[1] - speed];
                    break;
                case MoveDirection.Left:
                    newPosition = [position[0] - speed, position[1]];
                    break;
                case MoveDirection.Right:
                    newPosition = [position[0] + speed, position[1]];
                    break;
                default:
                    throw 'Invalid move direction: ' + direction;
            }

            object.setMoveDirection(direction);

            this.collisionService.processCollision(object, newPosition);

        }

        public finish(world: IWorld, process: IProcess): void {
            process.setProcessStatus(ProcessStatus.Finished);
        }
    }
}