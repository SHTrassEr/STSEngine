namespace STSEngine.Example {

    export class ProcessFireHandler extends STSEngine.ProcessHandler {

        protected worldServiceList: IWorld;

        constructor(worldServiceList: IWorld) {
            super(worldServiceList);
        }

        public executeProcess(process: ProcessFire): void {
            let item = this.worldServiceList.getItemListService().getTyped<ItemTank>(process.getObjectId(), ItemTank); 
            if (item) {
                this.fire(process, item);
            }

            process.setStatus(ProcessStatus.Finished);
        }

        protected fire(process: ProcessFire, item: ItemTank): void {
            var bullet = this.worldServiceList.getItemInitializer().createBullet();
            bullet.setPosition(item.getPosition());
            bullet.setClientId(item.getClientId());

            bullet.setFriction(0.1);

            var force = process.getPosition();
            VectorHelper.substract(force, item.getPosition());
            VectorHelper.normalize(force);
            bullet.setForce(force);
            bullet.setMass(10);
            bullet.setForceScale(0.01);
            bullet.setVelocity(item.getVelocity());
            

            this.worldServiceList.getItemListService().add(bullet);

            var moveProcess = this.worldServiceList.getProcessInitializer().createMoveItem();

            moveProcess.setItemId(bullet.getId());

            this.startProcess(moveProcess);

        }

    }
}