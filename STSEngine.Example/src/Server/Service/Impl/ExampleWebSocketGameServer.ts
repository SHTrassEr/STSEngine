namespace STSEngine.Example {

    export class ExampleWebSocketGameServer extends WebSocketGameServer {
    
        protected registerNewPlayer(newPlayerId: number) {
            let registerPlayerAttributeList: [number, any][] = [];
            registerPlayerAttributeList.push([CommandAttributeType.Type, CommandType.RegisterPlayer]);
            registerPlayerAttributeList.push([CommandAttributeType.InitiatorId, 0]);
            registerPlayerAttributeList.push([CommandAttributeType.NewPlayerId, newPlayerId]);
            var command = this.commandListService.add(registerPlayerAttributeList); 
        }


    }
}