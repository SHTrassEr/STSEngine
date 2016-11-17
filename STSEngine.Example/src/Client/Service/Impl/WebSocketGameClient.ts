namespace STSEngine.Example {

    export class WebSocketGameClient extends STSEngine.WebSocketGameClient implements IWebSocketGameClient {

        protected engine: IEngine;

        constructor(socket: WebSocket, sid: string, clientAction: IClientAction) {

            let clientServerMessageInitializer = new ClientServerMessageInitializer();
            let worldAttributeList = new WorldAttributeList();
            let worldServiceList = new WorldServiceList(worldAttributeList);

            let world = new World(worldServiceList);

            let commandListService = new CommandListService();
            let engine = new Engine(world, commandListService);


            super(socket, sid, clientAction, engine, clientServerMessageInitializer);
        }

        public getEngine(): IEngine {
            return this.engine;
        }
    }
}