
namespace STSEngine {

    export class ObjectListServiceCommitable<T extends IObject> implements IObjectListService<T>, ICommitable {
        protected objectListService: IObjectListService<T>;
        protected deletedObjectIdList: Set<number>;
        protected newObjectIdList: Set<number>;
        protected filterService: IFilterService<T>;

        constructor() {
            this.deletedObjectIdList = new Set<number>();
            this.objectListService = new ObjectListService<T>();
            this.filterService = new FilterService<T>();
        }

        public init(objectList: Iterable<T>): void {
            this.clear();
            this.objectListService.init(objectList);
        }

        public get(id: number): T {
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

        public add(object: T): void {
            this.objectListService.add(object);
            this.newObjectIdList.add(object.getId());
        }

        protected isObjectNotDeleted(object: T): boolean {
            return !this.deletedObjectIdList.has(object.getId());
        }

        public getIterator(): IterableIterator<T> {
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

        public getAll(condition: (item: T) => boolean): IterableIterator<T> {
            return this.filterService.getAll(this.getIterator(), condition);
        }

        public getFirst(condition: (item: T) => boolean): T {
            return this.filterService.getFirst(this.getIterator(), condition);
        }
    }
}