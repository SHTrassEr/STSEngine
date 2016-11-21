namespace STSEngine.Example {

    export class WebSocketGameClient extends Core.WebSocketGameClient implements IWebSocketGameClient {

        protected engine: IEngine;

        constructor(socket: WebSocket, sid: string, clientAction: IClientAction) {

            let worldAttributeList = new WorldAttributeList();
            let world = new World(worldAttributeList);

            let commandListService = new STSEngine.Core.CommandListService();
            let engine = new Engine(world, commandListService);

            super(socket, sid, clientAction, engine);
        }

        public getEngine(): IEngine {
            return this.engine;
        }
    }
}