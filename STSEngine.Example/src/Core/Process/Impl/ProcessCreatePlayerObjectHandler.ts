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
            object.setPosition(new Point(0, 0));
            this.addObject(world, object);
            process.setProcessStatus(ProcessStatus.Finished);
        }
    }
}