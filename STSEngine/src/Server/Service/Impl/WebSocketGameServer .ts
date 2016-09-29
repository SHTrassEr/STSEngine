namespace STSEngine {

    export class WebSocketGameServer implements IWebSocketGameServer {

        protected webSocketServer: IWebSocketServer;
        protected world: IWorld;
        protected commandListService: ICommandListService
        protected gameServer: IGameServer;

        constructor(server: any) {
            this.webSocketServer = new WebSocketServer(server);
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
            let settings = this.createWorldSettings();
            return new World(settings);
        }

        protected createWorldSettings(): IWorldSettings {
            let settings: IKeyValuePair[] = [];
            settings.push(new KeyValuePair("moveStepSize", 10));
            return new WorldSettings(settings);
        }

        protected onUpdateWorld(world: IWorld, currentStepNumber: number, commandList: ICommand[]): void {
            let message = this.createTickMessage(currentStepNumber, commandList);
            this.webSocketServer.sendAll(message);
        }

        protected createTickMessage(currentStepNumber: number, commandList: ICommand[]): IClientServerMessage {
            let attributeList = this.createTickAttributeList(currentStepNumber, commandList);
            return new ClientServerMessage(ServerMessageType.Tick, attributeList);
        }

        protected createTickAttributeList(currentStepNumber: number, commandList: ICommand[]): IKeyValuePair[] {
            let attributeList: IKeyValuePair[] = [];
            attributeList.push(new KeyValuePair(AttributeType.StepNumber, currentStepNumber));

            let commandAttributeList: IKeyValuePair[][] = []
            if (commandList) {
                for (let command of commandList) {
                    commandAttributeList.push(command.getKeyValuePairList());
                }
            }

            attributeList.push(new KeyValuePair(AttributeType.CommandList, commandAttributeList));
            return attributeList;
        }

        protected registerNewPlayer(newPlayerId: number) {
            let registerPlayerAttributeList: IKeyValuePair[] = [];
            registerPlayerAttributeList.push(new KeyValuePair(STSEngine.AttributeType.CommandType, STSEngine.CommandType.RegisterPlayer));
            registerPlayerAttributeList.push(new KeyValuePair(STSEngine.AttributeType.PlayerId, 0));
            registerPlayerAttributeList.push(new KeyValuePair(STSEngine.AttributeType.NewPlayerId, newPlayerId));
            this.commandListService.createCommand(registerPlayerAttributeList);
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


        protected onClientMessage(webSocketClient: IWebSocketClient, message: IClientServerMessage): void {
            if (message.messageType == ClientMessageType.CommandList) {
                this.commandListService.setCommandList(<IKeyValuePair[][]>message.attributeList[0].value);
            }
        }

        public start(): void {
            this.gameServer.start();
        }
    }
}