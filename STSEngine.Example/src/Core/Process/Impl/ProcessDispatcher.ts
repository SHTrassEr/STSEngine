namespace STSEngine.Example {

    export class ProcessDispatcher extends STSEngine.ProcessDispatcher {

        constructor(world: IWorld) {
            super();
            this.initProcessHandlerList(world);
        }

        protected initProcessHandlerList(world: IWorld) {
            this.processHandlerList = [];
            this.processHandlerList[ProcessCreateClientItemTank.Type] = new ProcessCreateClientItemTankHandler(world);
            this.processHandlerList[ProcessFire.Type] = new ProcessFireHandler(world);
            this.processHandlerList[ProcessMoveItem.Type] = new ProcessMoveItemHandler(world);
        }   
    }
}