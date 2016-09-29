
namespace STSEngine {

    export class ObjectListService<T extends IObject> implements IObjectListService<T> {
        protected lastId: number;
        protected objectList: Map<number, T>;
        protected filterService: IFilterService<T>;
        protected objectGenerator: (attributeList: IKeyValuePair[]) => T;

        constructor(objectGenerator: (attributeList: IKeyValuePair[]) => T) {
            this.objectGenerator = objectGenerator;
            this.objectList = new Map<number, T>();
            this.filterService = new FilterService<T>();
            this.setLastId(0);
        }

        public init(objectList: IKeyValuePair[][], lastId: number): void {
            this.objectList.clear();
            for (let attributeList of objectList) {
                let object = this.objectGenerator(attributeList);
                this.set(object);
            }

            this.lastId = lastId;
        }


        protected getNewObjectId(): number {
            let lastObjectId = this.getLastId();
            let newObjectId = lastObjectId + 1;
            this.setLastId(newObjectId);
            return newObjectId;
        }

        public getLastId(): number {
            return this.lastId;
        }

        protected setLastId(id: number): void {
            this.lastId = id;
        }

        public get(objectId: number): T {
            return this.objectList.get(objectId);
        }

        public getSize(): number {
            return this.objectList.size;
        }

        public set(object: T): void {
            let objectId: number = object.getId();
            this.objectList.set(objectId, object);
        }

        public create(attributeList: IKeyValuePair[]): T {
            let objectId = this.getNewObjectId();
            attributeList.push(new KeyValuePair(AttributeType.Id, objectId));
            let object = this.objectGenerator(attributeList);
            this.set(object);
            return object;
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