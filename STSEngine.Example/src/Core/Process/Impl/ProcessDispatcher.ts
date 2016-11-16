namespace STSEngine.Example {

    export class ProcessDispatcher extends STSEngine.ProcessDispatcher {

        constructor(worldServiceList: IWorldServiceList) {
            super();
            this.initProcessHandlerList(worldServiceList);
        }

        protected initProcessHandlerList(worldServiceList: IWorldServiceList) {
            this.processHandlerList = [];
            this.processHandlerList[ProcessCreateClientItemTank.Type] = new ProcessCreateClientItemTankHandler(worldServiceList);
            this.processHandlerList[ProcessMoveObject.Type] = new ProcessMoveObjectHandler(worldServiceList);
            this.processHandlerList[ProcessFire.Type] = new ProcessFireHandler(worldServiceList);
            this.processHandlerList[ProcessMoveItem.Type] = new ProcessMoveItemHandler(worldServiceList);
        }   
    }
}