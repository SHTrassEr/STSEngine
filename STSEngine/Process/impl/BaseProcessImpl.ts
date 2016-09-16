module STSEngine {
    "use strict";

    export abstract class BaseProcessImpl implements IProcess {

        protected attributeList: IAttributeList;

        private world: IWorld;
        private id: number;
        private status: ProcessStatus;

        constructor(id: number, world: IWorld) {
            this.attributeList = new AttributeListImpl();

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

        protected objectListService: IObjectListService;
        protected worldSettings: IWorldSettings;

        //IAttributeList

        public getAttribute(attribute: string, defaultValue?: any): any {
            return this.attributeList.getAttribute(attribute, defaultValue);
        }

        public setAttribute(attribute: string, value: any): void {
            this.attributeList.setAttribute(attribute, value);
        }

        public hasAttribute(attribute: string): boolean {
            return this.attributeList.hasAttribute(attribute);
        }

        public rollback(): void {
            this.attributeList.rollback();
        }

        public commit(): void {
            this.attributeList.commit();
        }

        public isDirty(): boolean {
            return this.attributeList.isDirty();
        }

        public removeAttribute(attribute: string): void {
            this.attributeList.removeAttribute(attribute);
        }
    }

}