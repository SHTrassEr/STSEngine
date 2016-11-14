namespace STSEngine {

    export class WebSocketServer implements IWebSocketServer {

        private server: any;
        protected webSocketClientListService: IWebSocketClientListService;
        protected onClientConnectedHandler: (webSocketClient: IWebSocketClient) => void;
        protected onClientDisconnectedHandler: (webSocketClient: IWebSocketClient) => void;
        protected onClientMessageHandler: (webSocketClient: IWebSocketClient, message: IClientServerMessage) => void;

        constructor(server: any, clientSeverMessageInitializer: IClientServerMessageInitializer) {
            this.webSocketClientListService = new WebSocketClientListService(clientSeverMessageInitializer);
            this.server = server;
            this.init();
        }

        protected init() {
            this.server.on('connection', this.onConnection.bind(this));
        }

        public sendAll(message: IClientServerMessage): void {
            let webSocketClientList = this.webSocketClientListService.getWebSocketClientListIterator();
            for (let webSocketClient of webSocketClientList) {
                if (webSocketClient.getStatus() == WebSocketClientStatus.Connected) {
                    webSocketClient.sendMessage(message);
                }
            }
        }

        public setOnClientConnected(handler: (webSocketClient: IWebSocketClient) => void): void {
            this.onClientConnectedHandler = handler;
        }

        public setOnClientMessage(handler: (webSocketClient: IWebSocketClient, message: IClientServerMessage) => void): void {
            this.onClientMessageHandler = handler;
        }

        public setOnClientDisconnected(handler: (webSocketClient: IWebSocketClient) => void): void {
            this.onClientDisconnectedHandler = handler;
        }

        protected onConnection(client) {
            let webSocketClient = this.webSocketClientListService.addWebSocketClient(client);
            this.initWebSocketClient(webSocketClient);
        }

        protected initWebSocketClient(webSocketClient: IWebSocketClient) {
            webSocketClient.setOnMessage(this.onClientMessage.bind(this));
            webSocketClient.setOnClose(this.onClientDisconnected.bind(this));
            let message = new ClientServerMessageRequestAuthentication();
            webSocketClient.sendMessage(message);
        }

        protected onClientMessage(webSocketClient: IWebSocketClient, message: IClientServerMessage) {
            if (webSocketClient.getStatus() === WebSocketClientStatus.Initialization && message instanceof ClientServerMessageResponseAuthentication) {
                this.doAuthentication(webSocketClient, message);
            } else if (this.onClientMessageHandler) {
                this.onClientMessageHandler(webSocketClient, message);
            }
        }

        protected onClientDisconnected(webSocketClient: IWebSocketClient) {
            webSocketClient.setStatus(WebSocketClientStatus.Disconnected);
        }

        protected doAuthentication(webSocketClient: IWebSocketClient, message: ClientServerMessageResponseAuthentication) {
            let sid = message.getSID();
            console.log("Client connected. SID:" + sid);
            webSocketClient.setSID(sid);
            this.onClientConnected(webSocketClient);
        }

        protected onClientConnected(webSocketClient: IWebSocketClient) {
            webSocketClient.setStatus(WebSocketClientStatus.Connected);
            if (this.onClientConnectedHandler) {
                this.onClientConnectedHandler(webSocketClient);
            }
        }

        public close() {

        }
    }
}