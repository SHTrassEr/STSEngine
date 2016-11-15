namespace STSEngine {

    export abstract class WebSocketGameServer implements IWebSocketGameServer {

        protected webSocketServer: IWebSocketServer;
        protected world: IWorld;
        protected commandListService: ICommandListService;
        protected gameServer: IGameServer;
        protected worldServiceList: IWorldServiceList;
        protected clientSeverMessageInitializer: IClientServerMessageInitializer;


        constructor(server: any, worldServiceList: IWorldServiceList, clientSeverMessageInitializer: IClientServerMessageInitializer) {
            this.webSocketServer = new WebSocketServer(server, clientSeverMessageInitializer);

            this.worldServiceList = worldServiceList;

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
            return new World(this.worldServiceList);
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
            let clientId = this.getClientIdBySID(client.getSID());
            client.setPlayerId(clientId);
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

        protected abstract getClientIdBySID(sid: string);


        protected onClientMessage(webSocketClient: IWebSocketClient, message: IClientServerMessage): void {
            if (message instanceof ClientServerMessageCommandList) {
                this.processCommandList(webSocketClient, message);
            }
        }

        protected processCommandList(webSocketClient: IWebSocketClient, message: ClientServerMessageCommandList) {
            let commandList = this.worldServiceList.getCommandInitializer().createList(message.getCommandList());
            this.commandListService.setCommandList(this.initCommandList(webSocketClient, commandList));
        } 

        protected * initCommandList(webSocketClient: IWebSocketClient, commandList: Iterable<ICommand>): Iterable<ICommand> {
            var playerId = webSocketClient.getPlayerId();
            for (let command of commandList) {
                command.setInitiatorId(playerId);
                yield command;
            }
        }

        public start(): void {
            this.gameServer.start();
        }
    }
}