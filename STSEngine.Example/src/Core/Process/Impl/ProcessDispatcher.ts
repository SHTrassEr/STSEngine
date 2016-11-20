namespace STSEngine.Example {

    export class ProcessDispatcher extends STSEngine.ProcessDispatcher {

        constructor(worldServiceList: IWorld) {
            super();
            this.initProcessHandlerList(worldServiceList);
        }

        protected initProcessHandlerList(worldServiceList: IWorld) {
            this.processHandlerList = [];
            this.processHandlerList[ProcessCreateClientItemTank.Type] = new ProcessCreateClientItemTankHandler(worldServiceList);
            this.processHandlerList[ProcessFire.Type] = new ProcessFireHandler(worldServiceList);
            this.processHandlerList[ProcessMoveItem.Type] = new ProcessMoveItemHandler(worldServiceList);
        }   
    }
}