namespace STSEngine {

    export class WebSocketClient implements IWebSocketClient {

        protected id: number;
        protected clientId: number;
        protected status: WebSocketClientStatus;
        protected client: any;
        protected sid: string;
        protected onMessageHandler: (client: IWebSocketClient, message: IClientServerMessage) => void;
        protected onCloseHandler: (client: IWebSocketClient) => void;

        protected clientSeverMessageInitializer: IClientServerMessageInitializer;

        constructor(clientSeverMessageInitializer: IClientServerMessageInitializer, id: number, client: any) {
            this.clientSeverMessageInitializer = clientSeverMessageInitializer;
            this.id = id;
            this.client = client;
            this.setStatus(WebSocketClientStatus.Initialization);
            this.init();
        }

        protected init() {
            this.client.on('message', this.onMessage.bind(this));
            this.client.on('close', this.onMessage.bind(this));
        }

        protected onMessage(message: any): void {
            this.processMessage(JSON.parse(message));
        }

        protected processMessage(attr: Iterable<[number, any]>): void {
            if (this.status != WebSocketClientStatus.Disconnected) {
                if (attr && this.onMessageHandler) {

                    try {
                        var message = this.clientSeverMessageInitializer.create(attr);
                    }
                    catch (e) {
                        console.log(e);
                        this.status = WebSocketClientStatus.Disconnected;
                    }
                    
                    this.onMessageHandler(this, message);
                }
            }

        }

        protected onClose(): void {
            if (this.onCloseHandler) {
                this.onCloseHandler(this);
            }
        }

        public getId(): number {
            return this.id;
        }

        public getStatus(): WebSocketClientStatus {
            return this.status;
        }

        public setStatus(status: WebSocketClientStatus): void {
            this.status = status;
        }

        public getSID(): string {
            return this.sid;
        }

        public setSID(sid: string): void {
            this.sid = sid;
        }

        public getClientId(): number {
            return this.clientId;
        }

        public setClientId(clientId: number): void {
            this.clientId = clientId;
        }

        public sendMessage(attr: IClientServerMessage): void {
            try {
                this.client.send(JSON.stringify(attr.getList()));
            }
            catch (e) {
                console.log(e);
                this.status = WebSocketClientStatus.Disconnected;
            }
        }

        public setOnMessage(handler: (client: IWebSocketClient, message: IClientServerMessage) => void): void {
            this.onMessageHandler = handler;
        }

        public setOnClose(handler: (client: IWebSocketClient) => void): void {
            this.onCloseHandler = handler;
        }

        public close() {

        }
    }
}