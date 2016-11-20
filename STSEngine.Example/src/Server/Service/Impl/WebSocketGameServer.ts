namespace STSEngine.Example {

    export class WebSocketGameServer extends STSEngine.WebSocketGameServer {

        protected lastClientId: number;
        protected connectedClientList: Map<string, number>;


        constructor(socket: WebSocket) {

            let clientServerMessageInitializer = new ClientServerMessageInitializer();
            let worldAttributeList = new WorldAttributeList();
            let worldServiceList = new World(worldAttributeList);


            let commandListService = new CommandListService();
            let engine = new Engine(worldServiceList, commandListService);
            
            super(socket, engine, clientServerMessageInitializer);

            this.lastClientId = 0;
            this.connectedClientList = new Map<string, number>();

            let commandInitWorld = worldServiceList.getCommandInitializer().createInitWorld();
            commandInitWorld.setInitiatorId(0);
            commandListService.add(commandInitWorld);
        }


        protected getClientIdBySID(sid: string): number {
            var clientId = 0;

            if (this.connectedClientList.has(sid)) {
                clientId = this.connectedClientList.get(sid);
            } else {
                this.lastClientId = this.lastClientId + 1;
                clientId = this.lastClientId;
                var command = new CommandRegisterClient();
                command.setInitiatorId(0);
                command.setClientId(clientId);
                this.engine.getCommandListService().add(command); 

                this.connectedClientList.set(sid, clientId);
            }

            return clientId;
        }
    }
}