namespace STSEngine.Core {

    export interface IEventEntityListService<T extends IEntity> {
        getSource(): IEntityListService<T>;
        getEntity(): T;
    }
}