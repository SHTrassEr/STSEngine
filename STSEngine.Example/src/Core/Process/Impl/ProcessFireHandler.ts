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
            bullet.setPositionPrecise([object.getPosition(0) + (object.getSize()[0] / 2), object.getPosition(1) + (object.getSize()[0] / 2)]);
            bullet.setClientId(object.getClientId());
            bullet.setMaxSpeed(4);
            bullet.setSize([1, 1]);
            bullet.setMoveDirection(object.getMoveDirection());

            this.worldServiceList.getItemListService().add(bullet);
            var moveProcess = this.worldServiceList.getProcessInitializer().createMoveObject();
            moveProcess.setMoveDirection(object.getMoveDirection());
            moveProcess.setObjectId(bullet.getId());

            this.startProcess(moveProcess);

        }
    }
}