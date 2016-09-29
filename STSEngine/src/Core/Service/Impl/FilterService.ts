namespace STSEngine {

    export class FilterService<T> implements IFilterService<T> {

        public * getAll(itemList: Iterable<T>, condition: (item: T) => boolean): IterableIterator<T> {
            for (let item of itemList) {
                if (condition(item)) {
                    yield item;
                }
            }
        }

        public getFirst(itemList: Iterable<T>, condition: (item: T) => boolean): T {
            for (let item of itemList) {
                if (condition(item)) {
                    return item;
                }
            }

            return null;
        }
    }
}