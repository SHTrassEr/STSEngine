namespace STSEngine {

    export class LiteEvent<V> implements ILiteEvent<V> {

        private handlers: { (sender: any, data?: V): void; }[] = [];

        public on(handler: { (sender: any, data?: V): void }) {
            this.handlers.push(handler);
        }

        public off(handler: { (sender: any, data?: V): void }) {
            this.handlers = this.handlers.filter(h => h !== handler);
        }

        public trigger(sender: any, data?: V) {
            this.handlers.slice(0).forEach(h => h(sender, data));
        }
    }
}