namespace STSEngine.Core {

    export interface IEntityFactory {
        set(t: typeof Entity): void 
        has(t: typeof Entity | string): boolean;
        delete(t: typeof Entity | string): void;

        create<T extends IEntity>(e: typeof Entity): T;
        restore<T extends IEntity>(attr: Iterable<[number, any]>, baseClass: typeof Entity): T;
        restoreList<T extends IEntity>(attrList: Iterable<Iterable<[number, any]>>, baseClass: typeof Entity): Iterable<T>;
    }
}

