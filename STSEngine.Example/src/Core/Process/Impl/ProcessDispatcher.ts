namespace STSEngine.Example {

    export class ProcessDispatcher extends STSEngine.ProcessDispatcher {

        constructor(processInitializer: ProcessInitializer, objectInitializer: ObjectInitializer) {
            super();
            this.initProcessHandlerList(processInitializer, objectInitializer);
        }

        protected initProcessHandlerList(processInitializer: ProcessInitializer, objectInitializer: ObjectInitializer) {
            this.processHandlerList = [];
            this.processHandlerList[ProcessType.CreatePlayerObject] = new ProcessCreatePlayerObjectHandler(processInitializer, objectInitializer);
            this.processHandlerList[ProcessType.Move] = new ProcessMoveObjectHandler(processInitializer, objectInitializer);
        }
        
    }

}