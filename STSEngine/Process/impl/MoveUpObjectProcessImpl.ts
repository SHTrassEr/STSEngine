module STSEngine {
    "use strict";

    export class MoveUpObjectProcessImpl extends BaseProcessImpl {

        public step() {
        }

        public isFinished(state: IObject): boolean {
            var position: IPoint = state.getPosition();
            var gridSize: number = this.getWorld().getSettings().getMoveStepSize();
            return (position.getY() % gridSize) === 0;
        }
    }
}