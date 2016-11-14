namespace STSEngine.Example {

    export class WebSocketGameClient extends STSEngine.WebSocketGameClient {

        constructor(socket: WebSocket, playerAction: IPlayerAction) {

            let clientServerMessageInitializer = new ClientServerMessageInitializer();
            let worldAttributeList = new WorldAttributeList();
            let worldServiceList = new WorldServiceList(worldAttributeList);
            super(socket, playerAction, worldServiceList, clientServerMessageInitializer);
        }
    }
}