namespace STSEngine.Example {

    export class ProcessMoveObjectHandler extends STSEngine.ProcessHandler {

        protected processInitializer: ProcessInitializer;
        protected objectInitializer: ObjectInitializer;

        constructor(processInitializer: ProcessInitializer, objectInitializer: ObjectInitializer) {
            super();
            this.processInitializer = processInitializer;
            this.objectInitializer = objectInitializer;
        }

        public initProcess(world: IWorld, process: ProcessMoveObject): void {
            process.setProcessStatus(ProcessStatus.Executing);
        }

        public executeProcess(world: IWorld, process: ProcessMoveObject): void {
            let object = this.getObject<ObjectPlayer>(world, process.getObjectId(), ObjectPlayer); 
            if (object) {
                this.moveObject(object, process.getMoveDirection());
            }
        }

        protected moveObject(object: ObjectPlayer, direction: MoveDirection): void {
            let position = object.getPosition();
            switch (direction) {
                case MoveDirection.Down:
                    object.setPosition(new Point(position.x, position.y - 1));
                    break;
                case MoveDirection.Up:
                    object.setPosition(new Point(position.x, position.y + 1));
                    break;
                case MoveDirection.Left:
                    object.setPosition(new Point(position.x - 1, position.y));
                    break;
                case MoveDirection.Right:
                    object.setPosition(new Point(position.x + 1, position.y));
                    break;
            }
        }

        public finish(world: IWorld, process: IProcess): void {
            process.setProcessStatus(ProcessStatus.Finished);
        }
    }
}