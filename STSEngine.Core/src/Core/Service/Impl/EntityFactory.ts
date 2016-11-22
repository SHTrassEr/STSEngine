
namespace STSEngine.Core {

    export class EntityFactory implements IEntityFactory {

        private initEntityHandler: (entity: IEntity, t?: typeof Entity, attr?: Iterable<[number, any]>) => void;
        protected itemAttributeType: number = 1;

        protected entityList: Map<string, typeof Entity>;

        constructor(initEntityHandler?: (entity: IEntity, t?: typeof Entity, attr?: Iterable<[number, any]>) => void) {
            this.entityList = new Map<string, typeof Entity>();
            this.initEntityHandler = initEntityHandler;
        }

        public set(t: typeof Entity): void {
            this.entityList.set(t.type, t);
        }

        public has(t: typeof Entity | string): boolean {
            let type = this.getType(t);
            return this.entityList.has(type);
        }

        public delete(t: typeof Entity | string): void {
            let type = this.getType(t);
        }

        protected getType(t: typeof Entity | string): string {
            if (typeof (t) === "string") {
                return t;
            }

            return t.type;
        }

        protected getItemType(attr: Iterable<[number, any]>): string {
            for (var kvp of attr) {
                if (kvp[0] == this.itemAttributeType) {
                    return kvp[1];
                }
            }

            throw new Error();
        }

        public * restoreList<T extends IEntity>(attrList: Iterable<Iterable<[number, any]>>, baseClass: typeof Entity): Iterable<T>{
            for (let attr of attrList) {
                yield this.restore<T>(attr, baseClass);
            }
        }


        protected createByType(type: string, attr?: Iterable<[number, any]>): IEntity {
            if (this.entityList.has(type)) {
                let t = this.entityList.get(type);
                let entity = new t(this.createAttributeList(type), attr);
                this.initEntity(entity);
                return entity;
            }

            throw new Error(type);
        }

        public restore<T extends IEntity>(attr: Iterable<[number, any]>, t: typeof Entity): T {
            let entity: IEntity;
            this.triggerEvent(this.onBeforeRestore, entity, t, attr);
            let type = this.getItemType(attr);
            if (type) {
                entity = this.createByType(type, attr);
                if (entity instanceof t) {
                    this.triggerEvent(this.onAfterRestore, entity, t, attr);
                    return <T><any>entity;
                }
            }

            
            throw new Error(JSON.stringify(attr));
        }

        public create<T extends IEntity>(t: typeof Entity): T {
            let entity: IEntity;
            this.triggerEvent(this.onBeforeCreate, entity, t);
            entity = this.createByType(t.type);
            if (entity instanceof t) {
                this.triggerEvent(this.onAfterCreate, entity, t);
                return <T><any>entity;
            }

            throw new Error();
        }

        protected createByAttr(attr: Iterable<[number, any]>): IEntity {
            var itemType = this.getItemType(attr);
            return this.createByType(itemType, attr);
        }

        protected initEntity(entity: IEntity, t?: typeof Entity, attr?: Iterable<[number, any]>) {
            this.triggerEvent(this.onBeforeInit, entity, t, attr);
            if (this.initEntityHandler) {
                this.initEntityHandler(entity, t, attr);
            }

            this.triggerEvent(this.onAfterInit, entity, t, attr);
        }

        protected createAttributeList(type: string): IAttributeList {
            return new AttributeListArray();
        }

        private onBeforeCreate = new LiteEvent<IEventEntityFactory>();
        private onAfterCreate = new LiteEvent<IEventEntityFactory>();
        private onBeforeRestore = new LiteEvent<IEventEntityFactory>();
        private onAfterRestore = new LiteEvent<IEventEntityFactory>();

        private onBeforeInit = new LiteEvent<IEventEntityFactory>();
        private onAfterInit = new LiteEvent<IEventEntityFactory>();

        protected triggerEvent(event: LiteEvent<IEventEntityFactory>, entity?: IEntity, type?: typeof Entity, attr?: Iterable<[number, any]>) {
            if (event.getCount() > 0) {
                let e = new EventEntityFactory(this, entity, type, attr);
                event.trigger(e);
            }
        }

        public beforeCreate(): ILiteEvent<IEventEntityFactory> {
            return this.onBeforeCreate;
        }

        public afterCreate(): ILiteEvent<IEventEntityFactory> {
            return this.onAfterCreate;
        }

        public beforeRestore(): ILiteEvent<IEventEntityFactory> {
            return this.onBeforeRestore;
        }

        public afterRestore(): ILiteEvent<IEventEntityFactory> {
            return this.onAfterRestore;
        }

        public beforeInit(): ILiteEvent<IEventEntityFactory> {
            return this.onBeforeInit;
        }

        public afterInit(): ILiteEvent<IEventEntityFactory> {
            return this.onAfterInit;
        }
    }
}