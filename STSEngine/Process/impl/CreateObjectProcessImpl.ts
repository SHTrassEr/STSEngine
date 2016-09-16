module STSEngine {
    "use strict";

    export class CreateObjectProcessImpl extends BaseProcessImpl {

        constructor(id: number, world: IWorld, attributeList: Map<string, any>) {
            super(id, world, attributeList);
        }

        public init(): void {
            var objectAttributeList = this.getAttribute(ProcessAttributeType.ObjectAttributeList);
            var objectId = this.objectListService.getNewObjectId();
            var object = new STSEngine.ObjectImpl(objectId, objectAttributeList);
            this.objectListService.addObject(object);
            this.setStatus(ProcessStatus.Finished);
        }


        public isFinished(state: IObject): boolean {
            var position: IPoint = state.getPosition();
            var gridSize: number = this.getWorld().getSettings().getMoveStepSize();
            return (position.getY() % gridSize) === 0;
        }
    }
}