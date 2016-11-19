namespace STSEngine.Example {

    export class ProcessMoveItemHandler extends STSEngine.ProcessHandler {

        protected worldServiceList: IWorldServiceList;

        constructor(worldServiceList: IWorldServiceList) {
            super(worldServiceList);
        }

        public executeProcess(process: ProcessMoveItem): void {
            var item = this.worldServiceList.getItemListService().get(process.getItemId());
            if (item) {
                this.moveItem(item);
            } else {
                process.setStatus(ProcessStatus.Finished);
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