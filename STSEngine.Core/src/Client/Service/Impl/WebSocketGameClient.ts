namespace STSEngine.Core {

    export class WebSocketGameClient implements IWebSocketGameClient {

        protected socket: WebSocket;
        protected sid: string;
        protected engine: IEngine;
        protected clientAction: IClientAction;
        protected clientId: number;

        protected onConnectedHandler: (webSocketClient: IWebSocketGameClient) => void;

        constructor(socket: WebSocket, sid: string, clientAction: IClientAction, engine: IEngine) {
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
            let message = this.engine.getWorld().getEntityFactory().restore<IClientServerMessage>(attr, ClientServerMessage);

            switch (message.getType()) {
                case ClientServerMessageRequestAuthentication.type:
                    this.sendAuthentication();
                    break;
                case ClientServerMessageInit.type:
                    this.processInit(<ClientServerMessageInit>message);
                    break;
                case ClientServerMessageStep.type:
                    this.processStep(<ClientServerMessageStep>message);
                    break;
                case ClientServerMessageStepList.type:
                    this.processStepList(<ClientServerMessageStepList>message);
                    break;
                case ClientServerMessageWorldFullInfo.type:
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
            let commandList = this.engine.getWorld().getEntityFactory().restoreList<ICommand>(commandListAttr, Command);
            this.engine.getCommandListService().setCommandList(commandList);
            this.engine.update();
        }

        protected processStepList(message: ClientServerMessageStepList) {
            var stepListAttr = message.getStepList();
            var stepList = this.engine.getWorld().getEntityFactory().restoreList<ClientServerMessageStep>(stepListAttr, ClientServerMessageStep);
            for (var step of stepList) {
                this.processStep(step);
            }
        }

        protected processWorldFullInfo(message: ClientServerMessageWorldFullInfo) {
            let world = this.engine.getWorld();
            world.getWorldAttributeList().setList(message.getWorldAttributeList(), true);

            let itemList = world.getEntityFactory().restoreList<IItem>(message.getItemListService(), Item);
            world.getItemListService().setList(itemList, true);

            let processList = world.getEntityFactory().restoreList<IProcess>(message.getProcessListService(), Process);
            world.getProcessListService().setList(processList, true);

            let clientList = world.getEntityFactory().restoreList<IClient>(message.getClientListService(), Client);
            world.getClientListService().setList(clientList, true);

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