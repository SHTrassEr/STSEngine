namespace STSEngine.Example {

    export class ProcessCreatePlayerObjectHandler extends STSEngine.ProcessHandler {

        protected processInitializer: ProcessInitializer;
        protected objectInitializer: ObjectInitializer;

        constructor(processInitializer: ProcessInitializer, objectInitializer: ObjectInitializer) {
            super();
            this.processInitializer = processInitializer;
            this.objectInitializer = objectInitializer;
        }

        public initProcess(world: IWorld, process: ProcessCreatePlayerObject): void {
            var object = this.objectInitializer.createPlayer();
            object.setPlayerId(process.getPlayerId());
            object.setPositionPrecise([40, 40]);
            object.setMaxSpeed(1);
            object.setSize([5, 5]);
            this.addObject(world, object);
            process.setProcessStatus(ProcessStatus.Finished);
        }
    }
}