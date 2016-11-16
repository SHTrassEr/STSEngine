namespace STSEngine.Example {

    export class WebSocketGameServer extends STSEngine.WebSocketGameServer {

        protected lastClientId: number;
        protected connectedClientList: Map<string, number>;


        constructor(socket: WebSocket) {

            let clientServerMessageInitializer = new ClientServerMessageInitializer();
            let worldAttributeList = new WorldAttributeList();
            let worldServiceList = new WorldServiceList(worldAttributeList);
            
            super(socket, worldServiceList, clientServerMessageInitializer);

            this.lastClientId = 0;
            this.connectedClientList = new Map<string, number>();
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
                this.commandListService.add(command); 

                this.connectedClientList.set(sid, clientId);
            }

            return clientId;
        }
    }
}