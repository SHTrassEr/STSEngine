namespace STSEngine.Example {

    export class ProcessMoveItemHandler extends STSEngine.ProcessHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            super(worldServiceList);
        }

        public executeProcess(process: ProcessMoveItem): void {
            var item = this.worldServiceList.getItemListService().get(process.getItemId());
            if (item) {
                this.moveItem(item);
            } else {
                process.setStatus(ProcessStatus.Finished);
            }
        }

        protected moveItem(item: IItem): void {

            let mass = item.getMass();
            
            let forceVector = item.getForceVector();
            let moveVector = item.getMoveVector();
            let position = item.getPosition();
            let frictionForce = VectorHelper.multScalar(moveVector, -1 * item.getFrictionModifier());

            moveVector[0] += (forceVector[0] + frictionForce[0]) / mass;
            moveVector[1] += (forceVector[1] + frictionForce[1]) / mass;

            item.setMoveVector(moveVector);

            this.worldServiceList.getCollisionService().processCollision(item);

            item.setPosition(VectorHelper.sum(position, moveVector));
        }

    }
}