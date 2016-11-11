namespace STSEngine.Example {

    export class ExampleWebSocketGameClient extends WebSocketGameClient {

        constructor(socket: WebSocket, playerAction: IPlayerAction) {

            let worldAttributeList = new WorldAttributeList();
            let worldServiceList = new ExampleWorldServiceList(worldAttributeList);
            super(socket, playerAction, worldServiceList);
        }
    }
}