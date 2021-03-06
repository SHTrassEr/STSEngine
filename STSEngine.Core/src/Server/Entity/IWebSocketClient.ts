﻿namespace STSEngine.Core {

    export interface IWebSocketClient {

        getId(): number;

        getStatus(): WebSocketClientStatus;
        setStatus(status: WebSocketClientStatus): void;

        getSID(): string;
        setSID(sid: string): void;

        getClientId(): number;
        setClientId(clientId: number): void;

        sendMessage(message: IClientServerMessage);
        setOnMessage(handler: (client: IWebSocketClient, message: IClientServerMessage) => void): void;
        setOnClose(handler: (client: IWebSocketClient) => void): void;

        
        close();
    }
}