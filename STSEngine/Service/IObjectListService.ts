namespace STSEngine {
    "use strict";

    export interface IObjectListService extends ICommitable, IFilterable<IObject> {
        getObject(id: number): IObject;
        createObject(attributeList?: Map<string, any> | IKeyValuePair[]): IObject;
        removeObject(id: number): void;
    }
}