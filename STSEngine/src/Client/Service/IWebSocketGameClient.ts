namespace STSEngine {

    export interface IWebSocketGameClient {

        getWorld(): IWorld;
        getPlayerId(): number;
        setOnConnected(handler: (webSocketClient: IWebSocketGameClient) => void): void;
    }
}