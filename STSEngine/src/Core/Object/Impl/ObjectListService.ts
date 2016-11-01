
namespace STSEngine {

    export class ObjectListService implements IObjectListService {
        protected objectList: Map<number, IObject>;
        protected filterService: IFilterService<IObject>;

        constructor() {
            this.objectList = new Map<number, IObject>();
            this.filterService = new FilterService<IObject>();
        }

        public init(objectList: Iterable<IObject>): void {
            this.objectList.clear();
            for (let object of objectList) {
                this.add(object);
            }
        }

        public get(objectId: number): IObject {
            return this.objectList.get(objectId);
        }

        public getSize(): number {
            return this.objectList.size;
        }

        public add(object: IObject): void {
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

        public getIterator(): IterableIterator<IObject> {
            return this.objectList.values();
        }

        public getAll(condition: (item: IObject) => boolean): IterableIterator<IObject> {
            return this.filterService.getAll(this.objectList.values(), condition);
        }

        public getFirst(condition: (item: IObject) => boolean): IObject {
            return this.filterService.getFirst(this.objectList.values(), condition);
        }
    }
}