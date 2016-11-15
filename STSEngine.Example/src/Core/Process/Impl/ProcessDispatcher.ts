namespace STSEngine.Example {

    export class ProcessDispatcher extends STSEngine.ProcessDispatcher {

        constructor(worldServiceList: IWorldServiceList) {
            super();
            this.initProcessHandlerList(worldServiceList);
        }

        protected initProcessHandlerList(worldServiceList: IWorldServiceList) {
            this.processHandlerList = [];
            this.processHandlerList[ProcessType.CreatePlayerObject] = new ProcessCreatePlayerObjectHandler(worldServiceList);
            this.processHandlerList[ProcessType.Move] = new ProcessMoveObjectHandler(worldServiceList);
            this.processHandlerList[ProcessType.Fire] = new ProcessFireHandler(worldServiceList);
        }
        
    }

}