
namespace STSEngine.Core {

    export class EntityListService<T extends IEntity> implements IEntityListService<T> {
        protected itemList: Map<number, T>;
        protected filterService: IFilterService<T>;

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
            this.triggerEvent(this.onBeforeAdd, item);
            let itemId: number = item.getId();
            this.itemList.set(itemId, item);
            this.triggerEvent(this.onAfterAdd, item);
        }

        public has(id: number): boolean {
            return this.itemList.has(id);
        }

        public remove(id: number): void {
            let item = this.get(id);
            if (item) {
                this.triggerEvent(this.onBeforeRemove, item);
                this.itemList.delete(id);
                this.triggerEvent(this.onAfterRemove, item);
            }
        }

        public clear(): void {
            this.triggerEvent(this.onBeforeClear);
            this.itemList.clear();
            this.triggerEvent(this.onAfterClear);
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

        private onBeforeAdd = new LiteEvent<IEventEntityListService<T>>();
        private onAfterAdd = new LiteEvent<IEventEntityListService<T>>();
        private onBeforeRemove = new LiteEvent<IEventEntityListService<T>>();
        private onAfterRemove = new LiteEvent<IEventEntityListService<T>>();
        private onBeforeClear = new LiteEvent<IEventEntityListService<T>>();
        private onAfterClear = new LiteEvent<IEventEntityListService<T>>();

        protected triggerEvent(event: LiteEvent<IEventEntityListService<T>>, item?: T) {
            if (event.getCount() > 0) {
                let e = new EventEntityListService<T>(this, item);
                event.trigger(e);
            }
        }

        public beforeAdd(): ILiteEvent<IEventEntityListService<T>> {
            return this.onBeforeAdd;
        }

        public afterAdd(): ILiteEvent<IEventEntityListService<T>> {
            return this.onAfterAdd;
        }

        public beforeRemove(): ILiteEvent<IEventEntityListService<T>> {
            return this.onBeforeRemove;
        }

        public afterRemove(): ILiteEvent<IEventEntityListService<T>> {
            return this.onAfterRemove;
        }

        public beforeClear(): ILiteEvent<IEventEntityListService<T>> {
            return this.onBeforeClear;
        }

        public afterClear(): ILiteEvent<IEventEntityListService<T>> {
            return this.onAfterClear;
        }
    }
}