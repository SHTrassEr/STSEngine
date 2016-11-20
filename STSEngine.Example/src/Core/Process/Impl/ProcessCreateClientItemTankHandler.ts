namespace STSEngine.Example {

    export class ProcessCreateClientItemTankHandler extends STSEngine.ProcessHandler {

        protected world: IWorld;

        constructor(world: IWorld) {
            super(world);
        }

        public initProcess(process: ProcessCreateClientItemTank): void {
            let itemTank = this.world.getItemInitializer().createTank();
            itemTank.setClientId(process.getClientId());
            itemTank.setPosition(new Vector(40, 40));
            itemTank.setForce(new Vector(0, 0));
            itemTank.setFriction(1);
            itemTank.setForceScale(0.06);
            itemTank.setMass(50);

            this.world.getItemListService().add(itemTank);

            var moveProcess = this.world.getProcessInitializer().createMoveItem();
            moveProcess.setItemId(itemTank.getId());
            this.startProcess(moveProcess);

            process.setStatus(ProcessStatus.Finished);
        }
    }
}