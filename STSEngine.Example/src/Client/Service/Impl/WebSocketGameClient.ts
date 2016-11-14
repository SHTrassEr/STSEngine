namespace STSEngine.Example {

    export class WebSocketGameClient extends STSEngine.WebSocketGameClient {

        constructor(socket: WebSocket, sid: string, playerAction: IPlayerAction) {

            let clientServerMessageInitializer = new ClientServerMessageInitializer();
            let worldAttributeList = new WorldAttributeList();
            let worldServiceList = new WorldServiceList(worldAttributeList);
            super(socket, sid, playerAction, worldServiceList, clientServerMessageInitializer);
        }
    }
}