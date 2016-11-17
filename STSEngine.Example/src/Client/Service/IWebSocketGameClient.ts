namespace STSEngine.Example {

    export interface IWebSocketGameClient extends STSEngine.IWebSocketGameClient {

        getEngine(): IEngine;
        getClientId(): number;
        setOnConnected(handler: (webSocketClient: IWebSocketGameClient) => void): void;
    }
}