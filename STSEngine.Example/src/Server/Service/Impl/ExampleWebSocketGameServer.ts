namespace STSEngine.Example {

    export class ExampleWebSocketGameServer extends WebSocketGameServer {
    
        protected registerNewPlayer(newPlayerId: number) {

            var command = new CommandRegisterPlayer();
            command.setInitiatorId(0);
            command.setPlayerId(newPlayerId);
            this.commandListService.add(command); 
        }
    }
}