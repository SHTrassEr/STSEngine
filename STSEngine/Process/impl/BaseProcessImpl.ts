module STSEngine {
    "use strict";

    export abstract class BaseProcessImpl implements IProcess {

        protected attributeList: IAttributeList;

        private world: IWorld;
        private status: ProcessStatus;

        constructor(id: number, world: IWorld, attributeList?: Map<string, any>) {
            this.attributeList = new AttributeListImpl();

            this.setAttribute(ProcessAttributeType.Id, id);
            this.world = world;
            this.objectListService = world.getObjectListService();
            this.worldSettings = world.getSettings();
            this.status = ProcessStatus.Init;

            if (attributeList) {
                this.setAttributeList(attributeList);
            }
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
            return this.getAttribute(ProcessAttributeType.Id);
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

        protected getObjectId(): number {
            return this.getAttribute(ProcessAttributeType.ObjectId);
        }

        protected setObjectId(objectId: number): void {
            this.setAttribute(ProcessAttributeType.ObjectId, objectId);
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

        public setAttributeList(attributeList: Map<string, any>): void {
            this.attributeList.setAttributeList(attributeList);
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