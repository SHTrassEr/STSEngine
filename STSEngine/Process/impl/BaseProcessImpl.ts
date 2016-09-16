module STSEngine {
    "use strict";

    export abstract class BaseProcessImpl implements IProcess {

        private world: IWorld;
        private id: number;
        private status: ProcessStatus;

        constructor(id: number, world: IWorld) {
            this.id = id;
            this.world = world;
            this.objectListService = world.getObjectStateListService();
            this.worldSettings = world.getSettings();
            this.status = ProcessStatus.Init;
        }

        public init(): void {
        }

        public finish(): void {
        }

        public getStatus(): ProcessStatus {
            return this.status;
        }

        public step(): void {
        }

        public isFinished(state: IObject): boolean {
            return true;
        }

        public getId(): number {
            return this.id;
        }

        protected setStatus(status: ProcessStatus) {
            this.status = status;
        }

        protected getWorld(): IWorld {
            return this.world;
        }

        protected getObjectById(objectId: number): IObject {
            return this.objectListService.getObject(objectId);
        }

        protected setObject(objectStatus: IObject) {
            this.objectListService.setObject(objectStatus);
        }

        protected objectListService: IObjectListService;
        protected worldSettings: IWorldSettings;
    }

}