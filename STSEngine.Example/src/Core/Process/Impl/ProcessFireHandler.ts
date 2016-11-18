namespace STSEngine.Example {

    export class ProcessFireHandler extends STSEngine.ProcessHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
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
            bullet.setPosition([item.getPosition(0), item.getPosition(1)]);
            bullet.setClientId(item.getClientId());

            bullet.setFrictionModifier(0.1);

            var v = VectorHelper.normalize(VectorHelper.substract(process.getPosition(), item.getPosition()));

            v = VectorHelper.multScalar(v, 0.08);


            bullet.setForceVector(v);
            bullet.setMoveVector(VectorHelper.copy(item.getMoveVector()));
            bullet.setMass(5);

            this.worldServiceList.getItemListService().add(bullet);

            var moveProcess = this.worldServiceList.getProcessInitializer().createMoveItem();

            moveProcess.setItemId(bullet.getId());

            this.startProcess(moveProcess);

        }

    }
}