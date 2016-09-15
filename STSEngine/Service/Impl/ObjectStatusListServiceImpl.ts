
module STSEngine {
    "use strict";

    export class ObjectListServiceImpl implements IObjectListService {

        protected currentObjectList: Map<number, IObject>;
        protected newObjectList: Map<number, IObject>;

        constructor() {
            this.currentObjectList = new Map<number, IObject>();
            this.newObjectList = new Map<number, IObject>();
        }

        public getCurrentObject(id: number): IObject {
            return this.currentObjectList.get(id);
        }

        public getObject(id: number): IObject {
            return this.newObjectList.get(id);
        }

        public setObject(object: IObject): void {
            var objectId: number = object.getId();
            this.newObjectList.set(objectId, object);
        }

        public commitChanges(): void {
            for (var newObject of this.newObjectList.values()) {
                var objectId: number = newObject.getId();
                this.currentObjectList.set(objectId, newObject);
            }

            this.newObjectList.clear();
        }
    }

}