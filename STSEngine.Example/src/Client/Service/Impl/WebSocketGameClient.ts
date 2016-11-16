namespace STSEngine.Example {

    export class WebSocketGameClient extends STSEngine.WebSocketGameClient {

        constructor(socket: WebSocket, sid: string, clientAction: IClientAction) {

            let clientServerMessageInitializer = new ClientServerMessageInitializer();
            let worldAttributeList = new WorldAttributeList();
            let worldServiceList = new WorldServiceList(worldAttributeList);
            super(socket, sid, clientAction, worldServiceList, clientServerMessageInitializer);
        }
    }
}