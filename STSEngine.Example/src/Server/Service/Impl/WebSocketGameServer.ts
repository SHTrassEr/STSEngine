namespace STSEngine.Example {

    export class WebSocketGameServer extends Core.WebSocketGameServer {

        protected lastClientId: number;
        protected connectedClientList: Map<string, number>;


        constructor(socket: WebSocket) {

            let worldAttributeList = new WorldAttributeList();
            let world = new World(worldAttributeList);


            let commandListService = new Core.CommandListService();
            let engine = new Engine(world, commandListService);
            
            super(socket, engine);

            this.lastClientId = 0;
            this.connectedClientList = new Map<string, number>();

            let commandInitWorld = world.getEntityFactory().create<CommandInitWorld>(CommandInitWorld);
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