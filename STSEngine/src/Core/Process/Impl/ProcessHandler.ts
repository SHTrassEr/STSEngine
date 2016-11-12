namespace STSEngine {

    export class ProcessHandler implements IProcessHandler {

        public init(world: IWorld, process: IProcess): void {
            if (this.isValidProcessType(world, process)) {
                this.initProcess(world, process);
            }
        }

        public execute(world: IWorld, process: IProcess): void {
            if (this.isValidProcessType(world, process)) {
                this.executeProcess(world, process);
                process.setProcessExecCount(process.getProcessExecCount() + 1);
            }
        }

        public finish(world: IWorld, process: IProcess): void {
            if (this.isValidProcessType(world, process)) {
                this.finishProcess(world, process);
            }
        }

        protected initProcess(world: IWorld, process: IProcess): void {

        }

        protected executeProcess(world: IWorld, process: IProcess): void {

        }

        protected finishProcess(world: IWorld, process: IProcess): void {

        }

        protected isValidProcessType(world: IWorld, command: IProcess): boolean {
            return true;
        }

        protected addObject(world: IWorld, object: IObject) {
            world.getServiceList().getObjectListService().add(object);
        }

        protected getObject<T extends IObject>(world: IWorld, objectId: number, type: any): T {
            let object = <any>world.getServiceList().getObjectListService().get(objectId);
            if (object instanceof type) {
                return <T>object;
            }

            return undefined;
        }

        protected startProcess(world: IWorld, process: IProcess): void {
            world.getServiceList().getProcessListService().add(process);
            world.getServiceList().getProcessDispatcher().init(world, process);
        }
    }
}