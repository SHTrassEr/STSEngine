namespace STSEngine.Example.Tanks {

    export class ProcessCreateClientItemTankHandler extends Core.ProcessHandler {

        protected world: IWorld;

        constructor(world: IWorld) {
            super(world);
        }

        public initProcess(process: ProcessCreateClientItemTank): void {
            let itemTank = this.world.getEntityFactory().create<ItemTank>(ItemTank);
            itemTank.setClientId(process.getClientId());
            itemTank.setPosition(new Vector(40, 40));
            itemTank.setForce(new Vector(0, 0));
            itemTank.setFriction(1);
            itemTank.setForceScale(0.06);
            itemTank.setMass(50);

            this.world.getItemListService().add(itemTank);

            var moveProcess = this.world.getEntityFactory().create<ProcessMoveItem>(ProcessMoveItem);
            moveProcess.setItemId(itemTank.getId());
            this.startProcess(moveProcess);

            process.setStatus(Core.ProcessStatus.Finished);
        }
    }
}