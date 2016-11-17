namespace STSEngine.Example {

    export class ProcessFireHandler extends STSEngine.ProcessHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            super(worldServiceList);
        }

        public executeProcess(process: ProcessFire): void {
            let object = this.worldServiceList.getItemListService().getTyped<ItemTank>(process.getObjectId(), ItemTank); 
            if (object) {
                this.fire(object);
            }

            process.setStatus(ProcessStatus.Finished);
        }

        protected fire(object: ItemTank): void {
            var bullet = this.worldServiceList.getItemInitializer().createBullet();
            bullet.setPosition([object.getPosition(0), object.getPosition(1)]);
            bullet.setClientId(object.getClientId());

            bullet.setFrictionModifier(0.1);

            bullet.setMoveVector(VectorHelper.copy(object.getMoveVector()));
            bullet.setForceVector([0, 0]);
            bullet.setMass(5);

            this.worldServiceList.getItemListService().add(bullet);

            var moveProcess = this.worldServiceList.getProcessInitializer().createMoveItem();

            moveProcess.setItemId(bullet.getId());

            this.startProcess(moveProcess);

        }
    }
}