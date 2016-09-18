
module STSEngine {
    "use strict";

    export class FilterServiceImpl<T> implements IFilterService<T> {

        public getAll(itemList: Iterable<T>, condition: (item: T) => boolean): T[] {
            var result: T[] = [];
            for (var item of itemList) {
                if (condition(item)) {
                    result.push(item);
                }
            }

            return result;
        }

        public getFirst(itemList: Iterable<T>, condition: (item: T) => boolean): T {
            for (var item of itemList) {
                if (condition(item)) {
                    return item;
                }
            }

            return null;
        }
    }
}