
namespace STSEngine.Core {

    export class EntityFactory implements IEntityFactory {

        private initEntityHandler: (entity: IEntity) => void;
        protected itemAttributeType: number = 1;

        protected entityList: Map<string, typeof Entity>;

        constructor(initEntityHandler?: (entity: IEntity) => void) {
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
            return null;
        }

        public restore<T extends IEntity>(attr: Iterable<[number, any]>, e: typeof Entity): T {
            let type = this.getItemType(attr);
            if (type) {
                let entity = this.createByType(type, attr);
                if (entity instanceof e) {
                    return <T><any>entity;
                }
            }

            
            throw new Error(JSON.stringify(attr));
        }

        public create<T extends IEntity>(e: typeof Entity): T {
            let entity = this.createByType(e.type);
            if (entity instanceof e) {
                return <T><any>entity;
            }

            throw new Error();
        }

        protected createByAttr(attr: Iterable<[number, any]>): IEntity {
            var itemType = this.getItemType(attr);
            return this.createByType(itemType, attr);
        }

        protected initEntity(entity: IEntity) {
            if (this.initEntityHandler) {
                return this.initEntityHandler(entity);
            }

            return null;
        }

        protected createAttributeList(type: string): IAttributeList {
            return new AttributeListArray();
        }
    }
}