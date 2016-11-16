namespace STSEngine.Example {

    export class ProcessFireHandler extends STSEngine.ProcessHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            super(worldServiceList);
        }

        public executeProcess(process: ProcessFire): void {
            let object = this.worldServiceList.getItemListService().getTyped<ItemPlayer>(process.getObjectId(), ItemPlayer); 
            if (object) {
                this.fire(object);
            }

            process.setStatus(ProcessStatus.Finished);
        }

        protected fire(object: ItemPlayer): void {
            var bullet = this.worldServiceList.getItemInitializer().createBullet();
            bullet.setPositionPrecise([object.getPosition(0) + (object.getSize()[0] / 2), object.getPosition(1) + (object.getSize()[0] / 2)]);
            bullet.setPlayerId(object.getPlayerId());
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