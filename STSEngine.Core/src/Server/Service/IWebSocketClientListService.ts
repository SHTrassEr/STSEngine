namespace STSEngine.Core {

    export interface IWebSocketClientListService  {
        addWebSocketClient(client: any): IWebSocketClient;
        getWebSocketClientListIterator(): IterableIterator<IWebSocketClient>;

    }
}