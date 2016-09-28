namespace STSEngine {

    export class WebSocketClient implements IWebSocketClient {

        protected id: number;
        protected status: WebSocketClientStatus;
        protected client: any;
        protected sid: string;
        protected onMessageHandler: (client: IWebSocketClient, message: IClientServerMessage) => void;
        protected onCloseHandler: (client: IWebSocketClient) => void;

        constructor(id: number, client: any) {
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

        protected processMessage(message: IClientServerMessage): void {
            if (message.messageType && this.onMessageHandler) {
                this.onMessageHandler(this, message);
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

        public sendMessage(message: IClientServerMessage): void {
            try {
                this.client.send(JSON.stringify(message));
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