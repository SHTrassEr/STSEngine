namespace STSEngine.Example {

    export class ProcessDispatcher extends STSEngine.ProcessDispatcher {

        constructor(worldServiceList: IWorldServiceList) {
            super();
            this.initProcessHandlerList(worldServiceList);
        }

        protected initProcessHandlerList(worldServiceList: IWorldServiceList) {
            this.processHandlerList = [];
            this.processHandlerList[ProcessCreatePlayerObject.Type] = new ProcessCreatePlayerObjectHandler(worldServiceList);
            this.processHandlerList[ProcessMoveObject.Type] = new ProcessMoveObjectHandler(worldServiceList);
            this.processHandlerList[ProcessFire.Type] = new ProcessFireHandler(worldServiceList);
        }
        
    }

}