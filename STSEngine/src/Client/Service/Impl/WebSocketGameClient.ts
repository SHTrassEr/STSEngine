namespace STSEngine {

    export class WebSocketGameClient {

        protected commandListService: ICommandListService
        protected socket: WebSocket;
        protected sid: string;
        protected engine: IEngine;
        protected playerAction: IPlayerAction;

        constructor(socket: WebSocket, playerAction: IPlayerAction) {
            this.commandListService = new CommandListService();
            this.socket = socket;
            this.playerAction = playerAction;
            this.sid = playerAction.getPlayerId().toString();
            this.playerAction.setOnAction(this.onPlayerAction.bind(this));
            this.init();
        }

        protected init() {
            var world = this.createWorld();
            this.engine = new Engine(world, this.commandListService);

            this.socket.onopen = this.onOpen.bind(this);
            this.socket.onmessage = this.onMessage.bind(this);
            this.socket.onclose = this.onClose.bind(this);
            this.socket.onerror = this.onError.bind(this);
        }

        public getWorld(): IWorld {
            return this.engine.getWorld();
        }

        protected onPlayerAction(playerAction: IPlayerAction) {
            var commandList = playerAction.getCommandKeyValuePairList();
            playerAction.clear();
            var attributeList: IKeyValuePair[] = [];
            attributeList.push(new KeyValuePair(AttributeType.CommandList, commandList));
            var message = new ClientServerMessage(ClientMessageType.CommandList, attributeList);
            this.sendMessage(message);
        }

        protected onOpen(ev:Event): void {
        }

        protected onMessage(ev: MessageEvent): void {
            var message = JSON.parse(ev.data);
            this.processServerMessage(message);
        }

        protected processServerMessage(message: IClientServerMessage): void {
            switch (message.messageType) {
                case ServerMessageType.RequestAuthentication:
                    this.sendAuthentication();
                    break;
                case ServerMessageType.Tick:
                    this.processTick(message.attributeList);
            }
        }

        protected sendAuthentication() {
            var attributeList: IKeyValuePair[] = [];
            attributeList.push(new KeyValuePair(AttributeType.SID, this.sid));
            var message = new ClientServerMessage(ClientMessageType.ResponseAuthentication, attributeList);
            this.sendMessage(message);
        }

        protected processTick(attributeList: IKeyValuePair[]) {
            var commandList = <IKeyValuePair[][]>attributeList[1].value;
            this.commandListService.setCommandList(commandList);
            this.engine.step();
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

        protected onClose(ev: CloseEvent): void {
            
        }

        protected onError(ev: Event): void {

        }

        protected sendMessage(message: IClientServerMessage) {
            this.socket.send(JSON.stringify(message));            
        }

    }
}