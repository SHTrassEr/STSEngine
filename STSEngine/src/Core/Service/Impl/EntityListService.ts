﻿
namespace STSEngine {

    export class EntityListService<T extends IEntity> implements IEntityListService<T> {
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

        public getList(): [number, any][][] {
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
            return this.filterService.getAll(this.objectList.values(), condition);
        }

        public getFirst(condition: (item: IEntity) => boolean): T {
            return this.filterService.getFirst(this.objectList.values(), condition);
        }

        public getTyped<V extends T>(objectId: number, type: any): V {
            let object = <any>this.get(objectId);
            if (object instanceof type) {
                return <V>object;
            }

            return undefined;
        }
    }
}