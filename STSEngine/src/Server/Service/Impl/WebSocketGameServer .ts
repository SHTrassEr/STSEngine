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
            var world = this.createWorld();
            var engine = new Engine(world, this.commandListService);
            this.gameServer = new GameServer(engine);
            this.gameServer.setOnUpdateWorld(this.onUpdateWorld.bind(this));
            this.webSocketServer.setOnClientConnected(this.onClientConnected.bind(this));
            this.webSocketServer.setOnClientMessage(this.onClientMessage.bind(this));
        }

        protected createWorld(): IWorld {
            var settings = this.createWorldSettings();
            return new World(settings);
        }

        protected createWorldSettings(): IWorldSettings {
            var settings: IKeyValuePair[] = [];
            settings.push(new KeyValuePair("moveStepSize", 10));
            return new WorldSettings(settings);
        }

        protected onUpdateWorld(world: IWorld, currentStepNumber: number, commandList: ICommand[]): void {
            var message = this.createTickMessage(currentStepNumber, commandList);
            this.webSocketServer.sendAll(message);
        }

        protected createTickMessage(currentStepNumber: number, commandList: ICommand[]): IClientServerMessage {
            var attributeList = this.createTickAttributeList(currentStepNumber, commandList);
            return new ClientServerMessage(ServerMessageType.Tick, attributeList);
        }

        protected createTickAttributeList(currentStepNumber: number, commandList: ICommand[]): IKeyValuePair[] {
            var attributeList: IKeyValuePair[] = [];
            attributeList.push(new KeyValuePair(AttributeType.StepNumber, currentStepNumber));

            var commandAttributeList: IKeyValuePair[][] = []
            if (commandList) {
                for (var command of commandList) {
                    commandAttributeList.push(command.getKeyValuePairList());
                }
            }

            attributeList.push(new KeyValuePair(AttributeType.CommandList, commandAttributeList));
            return attributeList;
        }

        protected registerNewPlayer(newPlayerId: number) {
            var registerPlayerAttributeList: IKeyValuePair[] = [];
            registerPlayerAttributeList.push(new KeyValuePair(STSEngine.AttributeType.CommandType, STSEngine.CommandType.RegisterPlayer));
            registerPlayerAttributeList.push(new KeyValuePair(STSEngine.AttributeType.PlayerId, 0));
            registerPlayerAttributeList.push(new KeyValuePair(STSEngine.AttributeType.NewPlayerId, newPlayerId));
            this.commandListService.createCommand(registerPlayerAttributeList);
        }

        protected onClientConnected(client: IWebSocketClient): void {
            var clientId = parseInt(client.getSID());
            this.registerNewPlayer(clientId);
            var commandLog = this.gameServer.getCommandLog(0);
            for (var commandList of commandLog) {
                var message = this.createTickMessage(0, commandList);
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