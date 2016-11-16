namespace STSEngine {

    export interface IWebSocketGameClient {

        getWorld(): IWorld;
        getClientId(): number;
        setOnConnected(handler: (webSocketClient: IWebSocketGameClient) => void): void;
    }
}