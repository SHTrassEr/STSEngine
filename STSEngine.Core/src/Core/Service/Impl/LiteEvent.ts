namespace STSEngine.Core {

    export class LiteEvent<V> implements ILiteEvent<V> {

        private handlers: { (data?: V): void; }[] = [];

        public getCount(): number {
            return this.handlers.length;
        }

        public on(handler: { (data?: V): void }) {
            this.handlers.push(handler);
        }

        public off(handler: { (data?: V): void }) {
            this.handlers = this.handlers.filter(h => h !== handler);
        }

        public trigger(data?: V) {
            for (let handler of this.handlers) {
                handler(data);
            }
        }
    }
}