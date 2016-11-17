namespace STSEngine {

    export class WebSocketGameClient implements IWebSocketGameClient {

        protected socket: WebSocket;
        protected sid: string;
        protected engine: IEngine;
        protected clientAction: IClientAction;
        protected clientId: number;
        protected clientSeverMessageInitializer: IClientServerMessageInitializer;

        protected onConnectedHandler: (webSocketClient: IWebSocketGameClient) => void;

        constructor(socket: WebSocket, sid: string, clientAction: IClientAction, engine: IEngine, clientSeverMessageInitializer: IClientServerMessageInitializer) {
            this.clientSeverMessageInitializer = clientSeverMessageInitializer;
            this.engine = engine;
            this.socket = socket;
            this.clientAction = clientAction;
            this.sid = sid;
            this.clientAction.setOnAction(this.onClientAction.bind(this));
            this.init();
        }

        public getClientId(): number {
            return this.clientId
        }

        public getEngine(): IEngine {
            return this.engine;
        }

        public setOnConnected(handler: (webSocketClient: IWebSocketGameClient) => void): void {
            this.onConnectedHandler = handler;
        }


        protected commandInitializator(attr: Iterable<[number, any]>): ICommand {
            return new Command(new AttributeListArray(), attr);
        }

        protected init() {
            this.socket.onopen = this.onOpen.bind(this);
            this.socket.onmessage = this.onMessage.bind(this);
            this.socket.onclose = this.onClose.bind(this);
            this.socket.onerror = this.onError.bind(this);
        }

        protected onClientAction(clientAction: IClientAction) {
            let commandList = clientAction.getCommandKeyValuePairList();
            clientAction.clear();
            var message = new ClientServerMessageCommandList();
            message.setCommandList(commandList);
            this.sendMessage(message);
        }

        protected onOpen(ev:Event): void {
        }

        protected onMessage(ev: MessageEvent): void {
            let message = JSON.parse(ev.data);
            this.processServerMessage(message);
        }

        protected processServerMessage(attr: Iterable<[number, any]>): void {
            let message = this.clientSeverMessageInitializer.create(attr);

            switch (message.getType()) {
                case ClientServerMessageRequestAuthentication.Type:
                    this.sendAuthentication();
                    break;
                case ClientServerMessageInit.Type:
                    this.processInit(<ClientServerMessageInit>message);
                    break;
                case ClientServerMessageStep.Type:
                    this.processStep(<ClientServerMessageStep>message);
                    break;
                case ClientServerMessageStepList.Type:
                    this.processStepList(<ClientServerMessageStepList>message);
                    break;
                case ClientServerMessageWorldFullInfo.Type:
                    this.processWorldFullInfo(<ClientServerMessageWorldFullInfo>message);
                    break;
            }
        }

        protected sendAuthentication() {
            let message = new ClientServerMessageResponseAuthentication();
            message.setSID(this.sid);
            this.sendMessage(message);
        }

        protected processStep(message: ClientServerMessageStep) {
            let commandListAttr = message.getCommandList();
            let commandList = this.engine.getWorld().getServiceList().getCommandInitializer().createList(commandListAttr);
            this.engine.getCommandListService().setCommandList(commandList);
            this.engine.step();
        }

        protected processStepList(message: ClientServerMessageStepList) {
            var stepListAttr = message.getStepList();
            var stepList = this.clientSeverMessageInitializer.createList(stepListAttr);
            for (var step of stepList) {
                this.processStep(<ClientServerMessageStep>step);
            }
        }

        protected processWorldFullInfo(message: ClientServerMessageWorldFullInfo) {
            let worldServiceList = this.engine.getWorld().getServiceList();
            worldServiceList.getWorldAttributeList().setList(message.getWorldAttributeList(), true);

            let itemList = worldServiceList.getItemInitializer().createList(message.getItemListService());
            worldServiceList.getItemListService().setList(itemList, true);

            let processList = worldServiceList.getProcessInitializer().createList(message.getProcessListService());
            worldServiceList.getProcessListService().setList(processList, true);

            let clientList = worldServiceList.getClientInitializer().createList(message.getClientListService());
            worldServiceList.getClientListService().setList(clientList, true);

        }

        protected processInit(message: ClientServerMessageInit) {
            this.clientId = message.getClientId();
            if (this.onConnectedHandler) {
                this.onConnectedHandler(this);
            }
        }

        protected onClose(ev: CloseEvent): void {
            
        }

        protected onError(ev: Event): void {

        }

        protected sendMessage(message: IClientServerMessage) {
            this.socket.send(JSON.stringify(message.getList()));            
        }

    }
}