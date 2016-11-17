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

            let f = Matter.Vector.create(item.getForceVector()[0] / 600, item.getForceVector()[1] / 600);
            let p = Matter.Vector.create(item.getBody().position.x, item.getBody().position.y);

            let body = item.getBody();

            if (f.x != 0 || f.y != 0) {
                Matter.Body.applyForce(body, p, f);
            }

            
            
            Matter.Body.setPosition(body, { x: MathHelper.round(body.position.x), y: MathHelper.round(body.position.y) });
            Matter.Body.setVelocity(body, { x: MathHelper.round(body.velocity.x, 0.1), y: MathHelper.round(body.velocity.y, 0.1) });

            

            
            /*

            item.getBody().

            let mass = item.getMass();
            
            let forceVector = item.getForceVector();
            let moveVector = item.getMoveVector();
            let position = item.getPosition();
            let frictionForce = VectorHelper.multScalar(moveVector, -1 * item.getFrictionModifier());

            moveVector[0] += (forceVector[0] + frictionForce[0]) / mass;
            moveVector[1] += (forceVector[1] + frictionForce[1]) / mass;

            item.setMoveVector(moveVector);

            this.worldServiceList.getCollisionService().processCollision(item);

            item.setPosition(VectorHelper.sum(position, moveVector));*/
        }

    }
}