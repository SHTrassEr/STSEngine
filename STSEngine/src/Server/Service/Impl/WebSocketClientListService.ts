namespace STSEngine {

    export class WebSocketClientListService implements IWebSocketClientListService {

        protected clientSeverMessageInitializer: IClientServerMessageInitializer;
        private webSocketClientList: Map<number, IWebSocketClient>;
        private lastSocketClientId: number;

        constructor(clientSeverMessageInitializer: IClientServerMessageInitializer) {
            this.clientSeverMessageInitializer = clientSeverMessageInitializer;
            this.lastSocketClientId = 0;
            this.webSocketClientList = new Map<number, IWebSocketClient>();
        }

        public addWebSocketClient(client: any): IWebSocketClient {
            let newClientId = this.getNewSocketClientId();
            let webSocketClient = new WebSocketClient(this.clientSeverMessageInitializer, newClientId, client);
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