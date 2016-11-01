namespace STSEngine {

    export class CommandHandler implements ICommandHandler {

        public execute(world: IWorld, command: ICommand): void {
            if (this.isValidCommandType(world, command)) {
                this.executeCommand(world, command);
            }
        }

        public isValid(world: IWorld, command: ICommand): boolean {
            if (this.isValidCommandType(world, command)) {
                return this.isValidCommand(world, command);
            }

            return false;
        }

        protected executeCommand(world: IWorld, command: ICommand) {

        }

        protected isValidCommand(world: IWorld, command: ICommand): boolean {
            return true;
        }

        protected isValidCommandType(world: IWorld, command: ICommand): boolean {
            return true;
        }

        protected startProcess(world: IWorld, process: IProcess): void {
            world.getServiceList().getProcessListService().add(process);
            world.getServiceList().getProcessDispatcher().init(world, process);
        }

        protected finishProcess(world: IWorld, process: IProcess): void {
            world.getServiceList().getProcessDispatcher().finish(world, process);
        }

        protected getObject<T extends IObject>(world: IWorld, objectId: number, type: any): T {
            let object = <any>world.getServiceList().getObjectListService().get(objectId);
            if (object instanceof type) {
                return <T>object;
            }

            return undefined;
        }

    }
}