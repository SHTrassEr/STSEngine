
namespace STSEngine.Core {

    export class EntityListService<T extends IEntity> implements IEntityListService<T> {
        protected itemList: Map<number, T>;
        protected filterService: IFilterService<T>;
        private onBeforeAdd = new LiteEvent<T>();   
        private onBeforeRemove = new LiteEvent<T>();   

        constructor() {
            this.itemList = new Map<number, T>();
            this.filterService = new FilterService<T>();
        }

        public init(itemList: Iterable<T>): void {
            this.itemList.clear();
            for (let item of itemList) {
                this.add(item);
            }
        }

        public get(itemId: number): T {
            return this.itemList.get(itemId);
        }

        public getSize(): number {
            return this.itemList.size;
        }

        public add(item: T): void {
            this.onBeforeAdd.trigger(this, item);
            let itemId: number = item.getId();
            this.itemList.set(itemId, item);
        }

        public has(id: number): boolean {
            return this.itemList.has(id);
        }

        public remove(id: number): void {
            let item = this.get(id);
            if (item) {
                this.onBeforeRemove.trigger(this, item);
                this.itemList.delete(id);
            }
        }

        public clear(): void {
            this.itemList.clear();
        }

        public getIterator(): IterableIterator<T> {
            return this.itemList.values();
        }

        public serialize(): [number, any][][] {
            let iterator = this.getIterator();
            let list: [number, any][][] = [];
            for (let entity of iterator) {
                list.push(entity.getList());
            }

            return list;
        }

        public setList(entityList: Iterable<T>, clear?: boolean): void {
            if (clear) {
                this.clear();
            }

            for (let entity of entityList) {
                this.add(entity);
            }
        }

        public getAll(condition: (item: IEntity) => boolean): IterableIterator<T> {
            return this.filterService.getAll(this.itemList.values(), condition);
        }

        public getFirst(condition: (item: IEntity) => boolean): T {
            return this.filterService.getFirst(this.itemList.values(), condition);
        }

        public getTyped<V extends T>(itemId: number, type: any): V {
            let item = <any>this.get(itemId);
            if (item instanceof type) {
                return <V>item;
            }

            return undefined;
        }

        public beforeAdd(): ILiteEvent<T> {
            return this.onBeforeAdd;
            
        }

        public beforeRemove(): ILiteEvent<T> {
            return this.onBeforeRemove;
        }
    }
}