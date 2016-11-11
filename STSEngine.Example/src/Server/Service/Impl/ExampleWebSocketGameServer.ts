namespace STSEngine.Example {

    export class ExampleWebSocketGameServer extends WebSocketGameServer {

        constructor(socket: WebSocket) {
            let worldAttributeList = new WorldAttributeList();
            let worldServiceList = new ExampleWorldServiceList(worldAttributeList);
            
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