namespace STSEngine.Example {

    export class WebSocketGameServer extends STSEngine.WebSocketGameServer {

        constructor(socket: WebSocket) {
            let worldAttributeList = new WorldAttributeList();
            let worldServiceList = new WorldServiceList(worldAttributeList);
            
            super(socket, worldServiceList);
        }

            
    
        protected registerNewPlayer(newPlayerId: number) {

            var command = new CommandRegisterPlayer();
            command.setInitiatorId(0);
            command.setPlayerId(newPlayerId);
            this.commandListService.add(command); 
        }
    }
}