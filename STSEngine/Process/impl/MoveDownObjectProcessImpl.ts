module STSEngine {
    "use strict";

    export class MoveDownObjectProcessImpl extends BaseProcessImpl {

        constructor(id: number, world: IWorld, objectId: number) {
            super(id, world);
            this.setObjectId(objectId);
        }

        public init(): void {
            var object = this.getObjectById(this.getObjectId());
            if (object.getMoveDirection() & MoveDirection.Down) {
                this.setStatus(ProcessStatus.Finished);
            }
        }

        public step(): void{
            var object = this.getObjectById(this.getObjectId());
            var position = object.getPosition();
            var newPosition = new STSEngine.PointImpl(position.getX(), position.getY() - 1);
            object.setPosition(newPosition);
        }

    }
}