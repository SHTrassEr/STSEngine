namespace STSEngine {

    export interface IObjectListServiceCommitable<T extends IObject & ICommitable> extends IObjectListService<T>, ICommitable {
    }
}