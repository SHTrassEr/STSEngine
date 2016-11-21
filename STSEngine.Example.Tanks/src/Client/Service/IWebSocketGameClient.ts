namespace STSEngine.Example.Tanks {

    export interface IWebSocketGameClient extends Core.IWebSocketGameClient {

        getEngine(): IEngine;
        getClientId(): number;
        setOnConnected(handler: (webSocketClient: IWebSocketGameClient) => void): void;
    }
}