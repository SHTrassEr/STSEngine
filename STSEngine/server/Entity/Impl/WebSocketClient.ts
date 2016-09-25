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
            this.client.on('message', this.onMessage);
            this.client.on('close', this.onMessage);
        }

        protected onMessage(message: IClientServerMessage) {
            if (message.messageType && this.onMessageHandler) {
                this.onMessageHandler(this, message);
            }
        }

        protected onClose() {
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

        public sendMessage(message: IClientServerMessage) {
            this.client.send(JSON.stringify(message));
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