
namespace STSEngine {

    export class ObjectListService<T extends IObject> implements IObjectListService<T> {
        protected objectList: Map<number, T>;
        protected filterService: IFilterService<T>;

        constructor() {
            this.objectList = new Map<number, T>();
            this.filterService = new FilterService<T>();
        }

        public init(objectList: Iterable<T>): void {
            this.objectList.clear();
            for (let object of objectList) {
                this.add(object);
            }
        }

        public get(objectId: number): T {
            return this.objectList.get(objectId);
        }

        public getSize(): number {
            return this.objectList.size;
        }

        public add(object: T): void {
            let objectId: number = object.getId();
            this.objectList.set(objectId, object);
        }

        public has(id: number): boolean {
            return this.objectList.has(id);
        }

        public remove(id: number): void {
            this.objectList.delete(id);
        }

        public clear(): void {
            this.objectList.clear();
        }

        public getIterator(): IterableIterator<T> {
            return this.objectList.values();
        }

        public getAll(condition: (item: IObject) => boolean): IterableIterator<T> {
            return this.filterService.getAll(this.objectList.values(), condition);
        }

        public getFirst(condition: (item: IObject) => boolean): T {
            return this.filterService.getFirst(this.objectList.values(), condition);
        }
    }
}