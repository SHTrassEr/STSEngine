namespace STSEngine.Example {

    export class ProcessCreateClientItemTankHandler extends STSEngine.ProcessHandler {

        protected worldServiceList: IWorld;

        constructor(worldServiceList: IWorld) {
            super(worldServiceList);
        }

        public initProcess(process: ProcessCreateClientItemTank): void {
            let itemTank = this.worldServiceList.getItemInitializer().createTank();
            itemTank.setClientId(process.getClientId());
            itemTank.setPosition(new Vector(40, 40));
            itemTank.setForce(new Vector(0, 0));
            itemTank.setFriction(1);
            itemTank.setForceScale(0.06);
            itemTank.setMass(50);

            this.worldServiceList.getItemListService().add(itemTank);

            var moveProcess = this.worldServiceList.getProcessInitializer().createMoveItem();
            moveProcess.setItemId(itemTank.getId());
            this.startProcess(moveProcess);

            process.setStatus(ProcessStatus.Finished);
        }
    }
}