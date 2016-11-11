
namespace STSEngine {

    export abstract class ItemInitializer<T> implements IItemInitializer<T> {

        public abstract create(attr: Iterable<[number, any]> | number): T;
        public abstract createList(attr: Iterable<Iterable<[number, any]>>): Iterable<T>;

        protected getId: () => number;

        public setGetIdHandler(getId: () => number) {
            this.getId = getId;
        }
    }
}