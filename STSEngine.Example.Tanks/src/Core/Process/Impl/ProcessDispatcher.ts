namespace STSEngine.Example.Tanks {

    export class ProcessDispatcher extends Core.ProcessDispatcher {

        constructor(world: IWorld) {
            super();
            this.initProcessHandlerList(world);
        }

        protected initProcessHandlerList(world: IWorld) {
            this.processHandlerList.set(ProcessCreateClientItemTank.type, new ProcessCreateClientItemTankHandler(world));
            this.processHandlerList.set(ProcessFire.type, new ProcessFireHandler(world));
            this.processHandlerList.set(ProcessMoveItem.type, new ProcessMoveItemHandler(world));
        }   
    }
}