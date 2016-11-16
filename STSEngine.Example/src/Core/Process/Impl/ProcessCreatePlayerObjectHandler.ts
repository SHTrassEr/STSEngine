namespace STSEngine.Example {

    export class ProcessCreatePlayerObjectHandler extends STSEngine.ProcessHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            super(worldServiceList);
        }

        public initProcess(process: ProcessCreatePlayerObject): void {
            let itemPlayer = this.worldServiceList.getItemInitializer().createPlayer();
            itemPlayer.setPlayerId(process.getPlayerId());
            itemPlayer.setSize([5, 5]);
            itemPlayer.setMoveDirection(MoveDirection.Up);
            itemPlayer.setPositionPrecise([40, 40]);
            itemPlayer.setMaxSpeed(1);
            this.worldServiceList.getItemListService().add(itemPlayer);
            process.setStatus(ProcessStatus.Finished);
        }
    }
}