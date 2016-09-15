module STSEngine {
    "use strict";

    export interface IObjectListService {

        getCurrentObject(id: number): IObject;
        getObject(id: number): IObject;
        setObject(state: IObject): void;
        commitChanges(): void;
    }
}