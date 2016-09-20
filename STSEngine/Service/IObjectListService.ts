namespace STSEngine {
    "use strict";

    export interface IObjectListService extends ICommitable, IFilterable<IObject> {
        getObject(id: number): IObject;
        createObject(attributeList: IKeyValuePair[]): IObject;
        setObjectList(objectList: IKeyValuePair[][]): void;
        removeObject(id: number): void;
    }
}