namespace STSEngine {

    export class WebSocketClientListService implements IWebSocketClientListService {

        private webSocketClientList: Map<number, IWebSocketClient>;
        private lastSocketClientId: number;

        constructor() {
            this.lastSocketClientId = 0;
            this.webSocketClientList = new Map<number, IWebSocketClient>();
        }

        public addWebSocketClient(client: any): IWebSocketClient {
            let newClientId = this.getNewSocketClientId();
            let webSocketClient = new WebSocketClient(newClientId, client);
            this.webSocketClientList.set(newClientId, webSocketClient);
            return webSocketClient;
        }

        public getWebSocketClientListIterator(): IterableIterator<IWebSocketClient> {
            return this.webSocketClientList.values();
        }

        protected getNewSocketClientId(): number {
            this.lastSocketClientId += 1;
            return this.lastSocketClientId;
        }

        public close() {

        }
    }
}