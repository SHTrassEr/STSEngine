namespace STSEngine {

    export class WebSocketServer implements IWebSocketServer {

        private server: any;
        protected webSocketClientListService: IWebSocketClientListService;
        protected onClientConnectedHandler: (webSocketClient: IWebSocketClient) => void;
        protected onClientDisconnectedHandler: (webSocketClient: IWebSocketClient) => void;
        protected onClientMessageHandler: (webSocketClient: IWebSocketClient, message: IClientServerMessage) => void;

        constructor(server: any) {
            this.webSocketClientListService = new WebSocketClientListService();
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
            webSocketClient.sendMessage(new ClientServerMessage(ServerMessageType.RequestAuthentication, null));
        }

        protected onClientMessage(webSocketClient: IWebSocketClient, message: IClientServerMessage) {
            if (webSocketClient.getStatus() === WebSocketClientStatus.Initialization && message.messageType === ClientMessageType.ResponseAuthentication) {
                this.doAuthentication(webSocketClient, message);
            } else if (this.onClientMessageHandler) {
                this.onClientMessageHandler(webSocketClient, message);
            }
        }

        protected onClientDisconnected(webSocketClient: IWebSocketClient) {
            webSocketClient.setStatus(WebSocketClientStatus.Disconnected);
        }

        protected doAuthentication(webSocketClient: IWebSocketClient, message: IClientServerMessage) {
            if (message.attributeList && message.attributeList.length == 1 && message.attributeList[0][0] == ClientMessageAttributeType.SID) {
                let sid = message.attributeList[0][1];
                console.log("Client connected. SID:" + sid);
                webSocketClient.setSID(sid);
                this.onClientConnected(webSocketClient);
            }

            //invalid authentication
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