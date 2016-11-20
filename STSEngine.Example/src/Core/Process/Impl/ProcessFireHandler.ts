namespace STSEngine.Example {

    export class ProcessFireHandler extends STSEngine.ProcessHandler {

        protected world: IWorld;

        constructor(world: IWorld) {
            super(world);
        }

        public executeProcess(process: ProcessFire): void {
            let item = this.world.getItemListService().getTyped<ItemTank>(process.getItemId(), ItemTank); 
            if (item) {
                this.fire(process, item);
            }

            process.setStatus(ProcessStatus.Finished);
        }

        protected fire(process: ProcessFire, item: ItemTank): void {
            var bullet = this.world.getItemInitializer().createBullet();
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
            

            this.world.getItemListService().add(bullet);

            var moveProcess = this.world.getProcessInitializer().createMoveItem();

            moveProcess.setItemId(bullet.getId());

            this.startProcess(moveProcess);

        }

    }
}