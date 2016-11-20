namespace STSEngine {

    export abstract class WebSocketGameServer implements IWebSocketGameServer {

        protected webSocketServer: IWebSocketServer;
        protected gameServer: IGameServer;
        protected engine: IEngine;
        protected clientSeverMessageInitializer: IClientServerMessageInitializer;


        constructor(server: any, engine: IEngine, clientSeverMessageInitializer: IClientServerMessageInitializer) {
            this.webSocketServer = new WebSocketServer(server, clientSeverMessageInitializer);

            this.engine = engine;

            this.clientSeverMessageInitializer = clientSeverMessageInitializer;
            this.init();
        }

        protected init() {
            this.gameServer = new GameServer(this.engine);
            this.gameServer.setOnUpdateWorld(this.onUpdateWorld.bind(this));
            this.webSocketServer.setOnClientConnected(this.onClientConnected.bind(this));
            this.webSocketServer.setOnClientMessage(this.onClientMessage.bind(this));
        }

        protected onUpdateWorld(world: IWorld, currentStepNumber: number, commandList: ICommand[]): void {

            /*let messageWorldFullInfo = new ClientServerMessageWorldFullInfo();
            messageWorldFullInfo.setWorld(this.engine.getWorld());

            this.webSocketServer.sendAll(messageWorldFullInfo);*/

            let message = this.createStepMessage(currentStepNumber, commandList);
            this.webSocketServer.sendAll(message);
        }

        protected createStepMessage(currentStepNumber: number, commandList: ICommand[]): ClientServerMessageStep {
            let message = new ClientServerMessageStep();
            message.setStepNumber(currentStepNumber);
            message.setCommandList(commandList);
            return message;
        }

        protected onClientConnected(client: IWebSocketClient): void {
            let clientId = this.getClientIdBySID(client.getSID());
            client.setClientId(clientId);
            let messageInit = new ClientServerMessageInit();
            messageInit.setClientId(clientId);
            client.sendMessage(messageInit);

            let messageWorldFullInfo = new ClientServerMessageWorldFullInfo();
            messageWorldFullInfo.setWorld(this.engine.getWorld());

            client.sendMessage(messageWorldFullInfo);
            

            /*let stepList: ClientServerMessageStep[] = [];
            let commandLog = this.gameServer.getCommandLog(0);
            for (let commandList of commandLog) {
                let message = this.createStepMessage(0, commandList);
                stepList.push(message);
            }

            let messageStepList = new ClientServerMessageStepList();
            messageStepList.setStepList(stepList);
            client.sendMessage(messageStepList);*/
        }

        protected abstract getClientIdBySID(sid: string);


        protected onClientMessage(webSocketClient: IWebSocketClient, message: IClientServerMessage): void {
            if (message instanceof ClientServerMessageCommandList) {
                this.processCommandList(webSocketClient, message);
            }
        }

        protected processCommandList(webSocketClient: IWebSocketClient, message: ClientServerMessageCommandList) {

            let commandList = this.engine.getWorld().getCommandInitializer().createList(message.getCommandList());
            this.engine.getCommandListService().setCommandList(this.initCommandList(webSocketClient, commandList));
        } 

        protected * initCommandList(webSocketClient: IWebSocketClient, commandList: Iterable<ICommand>): Iterable<ICommand> {
            var clientId = webSocketClient.getClientId();
            for (let command of commandList) {
                command.setInitiatorId(clientId);
                yield command;
            }
        }

        public start(): void {
            this.gameServer.start();
        }
    }
}