namespace STSEngine.Example {

    export class WebSocketGameServer extends STSEngine.WebSocketGameServer {

        constructor(socket: WebSocket) {

            let clientServerMessageInitializer = new ClientServerMessageInitializer();
            let worldAttributeList = new WorldAttributeList();
            let worldServiceList = new WorldServiceList(worldAttributeList);
            
            super(socket, worldServiceList, clientServerMessageInitializer);
        }

            
    
        protected registerNewPlayer(newPlayerId: number) {

            var command = new CommandRegisterPlayer();
            command.setInitiatorId(0);
            command.setPlayerId(newPlayerId);
            this.commandListService.add(command); 
        }
    }
}