namespace STSEngine.Example.Tanks {

    export class ProcessMoveItemHandler extends Core.ProcessHandler {

        protected world: IWorld;

        constructor(world: IWorld) {
            super(world);
        }

        public executeProcess(process: ProcessMoveItem): void {
            var item = this.world.getItemListService().get(process.getItemId());
            if (item) {
                this.moveItem(item);
            } else {
                process.setStatus(Core.ProcessStatus.Finished);
            }
        }

        protected moveItem(item: IItem): void {
        /*    let force = item.getForce();

            if (force.x != 0 || force.y != 0) {
                item.applyForce();
            }

            let position = item.getPosition();
            VectorHelper.round(position);
            item.setPosition(position);

            let velocity = item.getVelocity();
            VectorHelper.round(velocity);
            item.setVelocity(velocity);*/
        }

    }
}