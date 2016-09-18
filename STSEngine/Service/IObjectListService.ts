module STSEngine {
    "use strict";

    export interface IObjectListService extends ICommitable {
        getObject(id: number): IObject;
        createObject(attributeList?: Map<string, any> | IKeyValuePair[]): IObject;
        removeObject(id: number): void;

        getAll(condition: (item: IObject) => boolean): IObject[];
        getFirst(condition: (item: IObject) => boolean): IObject;
    }
}