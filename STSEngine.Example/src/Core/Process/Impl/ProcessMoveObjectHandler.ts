namespace STSEngine.Example {

    export class ProcessMoveObjectHandler extends STSEngine.ProcessHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            super(worldServiceList);
        }

        public initProcess(process: ProcessMoveObject): void {
            process.setProcessStatus(ProcessStatus.Executing);

            if (!process.getMoveDirection()) {
                throw new Error('Init process invalid state: move direction is not defined ' + process.getId() + ' ' + process.getObjectId());
            }
        }

        public executeProcess(process: ProcessMoveObject): void {
            var object = this.worldServiceList.getItemListService().get(process.getObjectId());
            if (object) {
                this.moveObject((<IItemRectangle>object), process.getMoveDirection(), process.getProcessExecCount());
            } else {
                process.setProcessStatus(ProcessStatus.Finished);
            }
        }

        protected moveObject(object: IItemRectangle, direction: MoveDirection, execCount: number): void {
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

            this.worldServiceList.getCollisionService().processCollision(object, newPosition);

        }

        public finish(process: IProcess): void {
            process.setProcessStatus(ProcessStatus.Finished);
        }
    }
}