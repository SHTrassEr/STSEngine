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
            itemTank.setMoveDirection(MoveDirection.Up);
            itemTank.setPositionPrecise([40, 40]);
            itemTank.setMaxSpeed(1);
            this.worldServiceList.getItemListService().add(itemTank);
            process.setStatus(ProcessStatus.Finished);
        }
    }
}