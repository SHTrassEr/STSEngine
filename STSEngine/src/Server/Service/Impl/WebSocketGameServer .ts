namespace STSEngine {

    export class WebSocketGameServer implements IWebSocketGameServer {

        protected webSocketServer: IWebSocketServer;
        protected world: IWorld;
        protected commandListService: ICommandListService;
        protected gameServer: IGameServer;
        protected worldSettings: IWorldServiceList;

        protected clientSeverMessageInitializer: IClientServerMessageInitializer;
        protected commandInitializer: IItemInitializer<ICommand>;

        constructor(server: any, worldServiceList: IWorldServiceList, clientSeverMessageInitializer: IClientServerMessageInitializer) {
            this.webSocketServer = new WebSocketServer(server, clientSeverMessageInitializer);

            this.worldSettings = worldServiceList;
            this.commandInitializer = worldServiceList.getCommandInitializer();
            this.commandListService = new CommandListService();
            this.clientSeverMessageInitializer = clientSeverMessageInitializer;
            this.init();
        }

        protected init() {
            let world = this.createWorld();
            let engine = new Engine(world, this.commandListService);
            this.gameServer = new GameServer(engine);
            this.gameServer.setOnUpdateWorld(this.onUpdateWorld.bind(this));
            this.webSocketServer.setOnClientConnected(this.onClientConnected.bind(this));
            this.webSocketServer.setOnClientMessage(this.onClientMessage.bind(this));
        }

        protected createWorld(): IWorld {
            return new World(this.worldSettings);
        }

        protected onUpdateWorld(world: IWorld, currentStepNumber: number, commandList: ICommand[]): void {
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
            let clientId = parseInt(client.getSID());
            this.registerNewPlayer(clientId);
            let messageInit = new ClientServerMessageInit();
            messageInit.setPlayerId(clientId);
            client.sendMessage(messageInit);

            let stepList: ClientServerMessageStep[] = [];
            let commandLog = this.gameServer.getCommandLog(0);
            for (let commandList of commandLog) {
                let message = this.createStepMessage(0, commandList);
                stepList.push(message);
            }

            let messageStepList = new ClientServerMessageStepList();
            messageStepList.setStepList(stepList);
            client.sendMessage(messageStepList);
        }

        protected registerNewPlayer(newPlayerId: number) {

        }


        protected onClientMessage(webSocketClient: IWebSocketClient, message: IClientServerMessage): void {
            if (message instanceof ClientServerMessageCommandList) {
                this.processCommandList(message);
            }
        }

        protected processCommandList(message: ClientServerMessageCommandList) {
            this.commandListService.setCommandList(this.commandInitializer.createList(message.getCommandList()));
        }

        public start(): void {
            this.gameServer.start();
        }
    }
}