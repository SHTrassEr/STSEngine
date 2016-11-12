namespace STSEngine.Example {

    export class ProcessDispatcher extends STSEngine.ProcessDispatcher {

        constructor(worldAttributeList: WorldAttributeList, collisionService: ICollisionService, processInitializer: ProcessInitializer, objectInitializer: ObjectInitializer) {
            super();
            this.initProcessHandlerList(worldAttributeList, collisionService, processInitializer, objectInitializer);
        }

        protected initProcessHandlerList(worldAttributeList: WorldAttributeList, collisionService: ICollisionService, processInitializer: ProcessInitializer, objectInitializer: ObjectInitializer) {
            this.processHandlerList = [];
            this.processHandlerList[ProcessType.CreatePlayerObject] = new ProcessCreatePlayerObjectHandler(processInitializer, objectInitializer);
            this.processHandlerList[ProcessType.Move] = new ProcessMoveObjectHandler(worldAttributeList, processInitializer, objectInitializer, collisionService);
            this.processHandlerList[ProcessType.Fire] = new ProcessFireHandler(worldAttributeList, processInitializer, objectInitializer, collisionService);
        }
        
    }

}