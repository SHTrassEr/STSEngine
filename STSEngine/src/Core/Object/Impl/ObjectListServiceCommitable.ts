
namespace STSEngine {

    export class ObjectListServiceCommitable implements IObjectListService, ICommitable {
        protected objectListService: IObjectListService;
        protected deletedObjectIdList: Set<number>;
        protected newObjectIdList: Set<number>;
        protected filterService: IFilterService<IObject>;

        constructor() {
            this.deletedObjectIdList = new Set<number>();
            this.objectListService = new ObjectListService();
            this.filterService = new FilterService<IObject>();
        }

        public init(objectList: Iterable<IObject>): void {
            this.clear();
            this.objectListService.init(objectList);
        }

        public get(id: number): IObject {
            if (!this.deletedObjectIdList.has(id)) {
                return this.objectListService.get(id);
            }

            return undefined;
        }

        public has(id: number): boolean {
            if (!this.deletedObjectIdList.has(id)) {
                return this.objectListService.has(id);
            }

            return false;
        }

        public getSize(): number {
            return (this.objectListService.getSize() - this.deletedObjectIdList.size);
        }

        public add(object: IObject): void {
            this.objectListService.add(object);
            this.newObjectIdList.add(object.getId());
        }

        protected isObjectNotDeleted(object: IObject): boolean {
            return !this.deletedObjectIdList.has(object.getId());
        }

        public getIterator(): IterableIterator<IObject> {
            return this.filterService.getAll(this.objectListService.getIterator(), this.isObjectNotDeleted.bind(this));
        }

        public remove(id: number): void {
            if (this.objectListService.has(id) && !this.deletedObjectIdList.has(id)) {
                this.deletedObjectIdList.add(id);
            }
        }

        public clear() {
            this.objectListService.clear();
            this.deletedObjectIdList.clear();
            this.newObjectIdList.clear();
        }

        public commit(): void {
            for (let objectId of this.deletedObjectIdList) {
                this.objectListService.remove(objectId);
            }

            this.newObjectIdList.clear();
            this.deletedObjectIdList.clear();

            for (let o of this.objectListService.getIterator()) {
                o.getAttributeList().commit();
            }
        }

        public rollback(): void {
            for (let objectId of this.newObjectIdList) {
                this.objectListService.remove(objectId);
            }

            this.newObjectIdList.clear();
            this.deletedObjectIdList.clear();
            for (let o of this.objectListService.getIterator()) {
                o.getAttributeList().rollback();
            }
        }

        public isDirty(): boolean {
            if (this.newObjectIdList.size > 0) {
                return true;
            }

            if (this.deletedObjectIdList.size > 0) {
                return true;
            }

            for (let o of this.objectListService.getIterator()) {
                if (o.getAttributeList().isDirty()) {
                    return true;
                }
            }

            return false;
        }

        public getAll(condition: (item: IObject) => boolean): IterableIterator<IObject> {
            return this.filterService.getAll(this.getIterator(), condition);
        }

        public getFirst(condition: (item: IObject) => boolean): IObject {
            return this.filterService.getFirst(this.getIterator(), condition);
        }
    }
}