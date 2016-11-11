namespace STSEngine {

    export class WebSocketGameServer implements IWebSocketGameServer {

        protected webSocketServer: IWebSocketServer;
        protected world: IWorld;
        protected commandListService: ICommandListService;
        protected gameServer: IGameServer;
        protected worldSettings: IWorldServiceList;

        protected commandInitializer: IItemInitializer<ICommand>;

        constructor(server: any, worldServiceList: IWorldServiceList) {
            this.webSocketServer = new WebSocketServer(server);

            this.worldSettings = worldServiceList;
            this.commandInitializer = worldServiceList.getCommandInitializer();
            this.commandListService = new CommandListService();
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
            let message = this.createTickMessage(currentStepNumber, commandList);
            this.webSocketServer.sendAll(message);
        }

        protected createTickMessage(currentStepNumber: number, commandList: ICommand[]): IClientServerMessage {
            let attributeList = this.createTickAttributeList(currentStepNumber, commandList);
            return new ClientServerMessage(ServerMessageType.Tick, attributeList);
        }

        protected createTickAttributeList(currentStepNumber: number, commandList: ICommand[]): [number, any][] {
            let attributeList: [number, any][] = [];
            attributeList.push([ServerMessageAttributeType.StepNumber, currentStepNumber]);

            let commandAttributeList: [number, any][][] = []
            if (commandList) {
                for (let command of commandList) {
                    commandAttributeList.push(command.getList());
                }
            }

            attributeList.push([ServerMessageAttributeType.CommandList, commandAttributeList]);
            return attributeList;
        }

        protected onClientConnected(client: IWebSocketClient): void {
            let clientId = parseInt(client.getSID());
            this.registerNewPlayer(clientId);
            let commandLog = this.gameServer.getCommandLog(0);
            for (let commandList of commandLog) {
                let message = this.createTickMessage(0, commandList);
                client.sendMessage(message);
            }
        }

        protected registerNewPlayer(newPlayerId: number) {

        }


        protected onClientMessage(webSocketClient: IWebSocketClient, message: IClientServerMessage): void {
            if (message.messageType == ClientMessageType.CommandList) {
                this.commandListService.setCommandList(this.commandInitializer.createList(message.attributeList[0][1]));
            }
        }

        public start(): void {
            this.gameServer.start();
        }
    }
}