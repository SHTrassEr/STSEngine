
namespace STSEngine.Core {

    export class EntityListServiceCommitable<T extends IEntity> {// implements IEntityListService<T>, ICommitable {
        protected itemListService: IEntityListService<T>;
        protected deletedItemIdList: Set<number>;
        protected newItemIdList: Set<number>;
        protected filterService: IFilterService<T>;
        private onBeforeAdd = new LiteEvent<T>();
        private onBeforeRemove = new LiteEvent<T>();   

        constructor() {
            this.deletedItemIdList = new Set<number>();
            this.itemListService = new EntityListService<T>();
            this.filterService = new FilterService<T>();
        }

        public init(itemList: Iterable<T>): void {
            this.clear();
            this.itemListService.init(itemList);
        }

        public get(id: number): T {
            if (!this.deletedItemIdList.has(id)) {
                return this.itemListService.get(id);
            }

            return undefined;
        }

        public has(id: number): boolean {
            if (!this.deletedItemIdList.has(id)) {
                return this.itemListService.has(id);
            }

            return false;
        }

        public getSize(): number {
            return (this.itemListService.getSize() - this.deletedItemIdList.size);
        }

        public add(item: T): void {
            this.onBeforeAdd.trigger(item);
            this.itemListService.add(item);
            this.newItemIdList.add(item.getId());
        }

        protected isItemNotDeleted(item: T): boolean {
            return !this.deletedItemIdList.has(item.getId());
        }

        public getIterator(): IterableIterator<T> {
            return this.filterService.getAll(this.itemListService.getIterator(), this.isItemNotDeleted.bind(this));
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

        public remove(id: number): void {
            if (this.itemListService.has(id) && !this.deletedItemIdList.has(id)) {
                this.deletedItemIdList.add(id);
            }
        }

        public clear() {
            this.itemListService.clear();
            this.deletedItemIdList.clear();
            this.newItemIdList.clear();
        }

        public commit(): void {
            for (let itemId of this.deletedItemIdList) {
                this.itemListService.remove(itemId);
            }

            this.newItemIdList.clear();
            this.deletedItemIdList.clear();

            for (let o of this.itemListService.getIterator()) {
                o.getAttributeList().commit();
            }
        }

        public rollback(): void {
            for (let itemId of this.newItemIdList) {
                this.itemListService.remove(itemId);
            }

            this.newItemIdList.clear();
            this.deletedItemIdList.clear();
            for (let o of this.itemListService.getIterator()) {
                o.getAttributeList().rollback();
            }
        }

        public isDirty(): boolean {
            if (this.newItemIdList.size > 0) {
                return true;
            }

            if (this.deletedItemIdList.size > 0) {
                return true;
            }

            for (let o of this.itemListService.getIterator()) {
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