namespace STSEngine.Core {

    export interface IWebSocketGameClient {

        getEngine(): IEngine;
        getClientId(): number;
        setOnConnected(handler: (webSocketClient: IWebSocketGameClient) => void): void;
    }
}