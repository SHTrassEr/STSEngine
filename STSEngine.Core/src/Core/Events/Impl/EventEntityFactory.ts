namespace STSEngine.Core {

    export class EventEntityFactory implements IEventEntityFactory {

        protected entityFactory: IEntityFactory;
        protected entity: IEntity;
        protected type: typeof Entity;
        protected attr: Iterable<[number, any]>;

        constructor(entityFactory: IEntityFactory, entity?: IEntity, type?: typeof Entity, attr?: Iterable<[number, any]>) {
            this.entityFactory = entityFactory;
            this.entity = entity;
            this.type = type;
            this.attr = attr;
        }


        public getSource(): IEntityFactory {
            return this.entityFactory;
        }

        public getEntity(): IEntity {
            return this.entity;
        }

        public getType(): typeof Entity {
            return this.type;
        }

        public getAttr(): Iterable<[number, any]> {
            return this.attr;
        }
    }
}