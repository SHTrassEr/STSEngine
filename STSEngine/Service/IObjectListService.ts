module STSEngine {
    "use strict";

    export interface IObjectListService extends ICommitable {
        getNewObjectId(): number;
        getObject(id: number): IObject;
        addObject(object: IObject): void;
        removeObject(id: number): void;

        getAll(condition: (item: IObject) => boolean): IObject[];
        getFirst(condition: (item: IObject) => boolean): IObject;
    }
}