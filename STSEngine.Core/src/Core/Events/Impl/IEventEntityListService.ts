namespace STSEngine.Core {

    export class EventEntityListService<T extends IEntity> implements IEventEntityListService<T> {

        protected entityListService: IEntityListService<T>;
        protected entity: T;

        constructor(entityListService: IEntityListService<T>, entity?: T) {
            this.entityListService = entityListService;
            this.entity = entity;
        }

        public getSource(): IEntityListService<T> {
            return this.entityListService;
        }

        public getEntity(): T {
            return this.entity;
        }
    }
}