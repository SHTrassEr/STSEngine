namespace STSEngine.Example {

    export class ProcessCreateClientItemTankHandler extends STSEngine.ProcessHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            super(worldServiceList);
        }

        public initProcess(process: ProcessCreateClientItemTank): void {
            let itemTank = this.worldServiceList.getItemInitializer().createTank();
            itemTank.setClientId(process.getClientId());
            itemTank.setSize([5, 5]);
            itemTank.setPosition([40, 40]);
            itemTank.setFrictionModifier(1);
            itemTank.setClientForceModifier(3);
            itemTank.setClientForceVector([0, 0]);
            itemTank.setMoveVector([0, 0]);
            itemTank.setMass(50);

            this.worldServiceList.getItemListService().add(itemTank);

            var moveProcess = this.worldServiceList.getProcessInitializer().createMoveItem();
            moveProcess.setItemId(itemTank.getId());
            this.startProcess(moveProcess);

            process.setStatus(ProcessStatus.Finished);
        }
    }
}