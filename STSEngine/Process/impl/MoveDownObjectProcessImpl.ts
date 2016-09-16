module STSEngine {
    "use strict";

    export class MoveDownObjectProcessImpl extends BaseProcessImpl {

        private objectId: number;

        constructor(id: number, world: IWorld, objectId: number) {
            super(id, world);
            this.objectId = objectId;
        }

        public init(): void {
            var objectStatus = this.getObjectById(this.objectId);
            if (objectStatus.getMoveDirection() & MoveDirection.Down) {
                this.setStatus(ProcessStatus.Finished);
            }
        }

        public step(): void{
        }

        public isFinished(state: IObject): boolean {
            var position: IPoint = state.getPosition();
            var gridSize: number = this.getWorld().getSettings().getMoveStepSize();
            return (position.getY() % gridSize) === 0;
        }
    }
}