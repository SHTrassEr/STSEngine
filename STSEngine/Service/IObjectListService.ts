module STSEngine {
    "use strict";

    export interface IObjectListService extends ICommitable {
        getObject(id: number): IObject;
        addObject(object: IObject): void;
        removeObject(id: number): void;
    }
}