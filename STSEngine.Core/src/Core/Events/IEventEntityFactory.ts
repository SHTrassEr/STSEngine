namespace STSEngine.Core {

    export interface IEventEntityFactory {
        getSource(): IEntityFactory;
        getEntity(): IEntity;
        getType(): typeof Entity;
        getAttr(): Iterable<[number, any]>;
    }
}