namespace STSEngine.Example {

    export class ProcessFireHandler extends STSEngine.ProcessHandler {

        protected processInitializer: ProcessInitializer;
        protected objectInitializer: ObjectInitializer;
        protected collisionService: ICollisionService;
        protected worldAttributeList: WorldAttributeList;

        constructor(worldAttributeList: WorldAttributeList, processInitializer: ProcessInitializer, objectInitializer: ObjectInitializer, collisionService: ICollisionService) {
            super();
            this.worldAttributeList = worldAttributeList;
            this.processInitializer = processInitializer;
            this.objectInitializer = objectInitializer;
            this.collisionService = collisionService;
        }

        public initProcess(world: IWorld, process: ProcessFire): void {
            process.setProcessStatus(ProcessStatus.Executing);
        }

        public executeProcess(world: IWorld, process: ProcessFire): void {
            let object = this.getObject<ObjectPlayer>(world, process.getObjectId(), ObjectPlayer); 
            if (object) {
                this.fire(world, object, world.getServiceList());
            }

            process.setProcessStatus(ProcessStatus.Finished);
        }

        protected fire(world: IWorld, object: ObjectPlayer, worldServiceList: IWorldServiceList): void {


            var bullet = this.objectInitializer.createBullet();
            bullet.setPosition([object.getPosition()[0], object.getPosition()[1]]);

            bullet.setSize([100, 100]);
            bullet.setMaxSpeed(100);
            bullet.setMoveDirection(object.getMoveDirection());

            worldServiceList.getObjectListService().add(bullet);
            var moveProcess = this.processInitializer.createMove();
            moveProcess.setMoveDirection(object.getMoveDirection());
            moveProcess.setObjectId(bullet.getId());

            this.startProcess(world, moveProcess);

        }

        public finish(world: IWorld, process: IProcess): void {
            process.setProcessStatus(ProcessStatus.Finished);
        }
    }
}