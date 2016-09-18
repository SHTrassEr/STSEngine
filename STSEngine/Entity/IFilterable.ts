module STSEngine {
    "use strict";

    export interface IFilterable<T> {
        getAll(condition: (item: T) => boolean): T[];
        getFirst(condition: (item: T) => boolean): T;
    }
}