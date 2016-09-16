
module STSEngine {
    "use strict";

    export class ObjectListServiceImpl implements IObjectListService {
        protected objectList: Map<number, IObject>;
        protected changedObjectList: Map<number, IObject>;
        protected attributeList: IAttributeList;

        constructor() {
            this.objectList = new Map<number, IObject>();
            this.changedObjectList = new Map<number, IObject>();
            this.attributeList = new STSEngine.AttributeListImpl();
            this.setLastId(0);
        }

        public getNewObjectId(): number {
            var lastObjectId = this.getLastId();
            var newObjectId = lastObjectId + 1;
            this.setLastId(newObjectId);
            return newObjectId;
        }

        protected getLastId(): number {
            return this.attributeList.getAttribute(ServiceAttributeType.LastId);
        }

        protected setLastId(id: number): void {
            this.attributeList.setAttribute(ServiceAttributeType.LastId, 0);
        }

        public getObject(objectId: number): IObject {
            if (this.changedObjectList.has(objectId)) {
                return this.changedObjectList.get(objectId);
            }

            return this.objectList.get(objectId);
        }

        public addObject(object: IObject): void {
            var objectId: number = object.getId();
            this.changedObjectList.set(objectId, object);
        }

        public removeObject(objectId: number): void {
            this.changedObjectList.set(objectId, undefined);
        }

        public commit(): void {
            for (var kvp of this.changedObjectList) {
                var key: number = kvp[0];
                var value: IObject = kvp[1];
                if (value === null || value === undefined) {
                    this.objectList.delete(key);
                } else {
                    this.objectList.set(key, value);
                }
            }

            this.changedObjectList.clear();

            for (var o of this.objectList.values()) {
                o.commit();
            }
        }

        public rollback(): void {
            this.changedObjectList.clear();
            for (var o of this.objectList.values()) {
                o.rollback();
            }
        }

        public isDirty(): boolean {
            if (this.changedObjectList.size > 0) {
                return true;
            }

            for (var o of this.objectList.values()) {
                if (o.isDirty()) {
                    return true;
                }
            }

            return false;
        }
    }
}