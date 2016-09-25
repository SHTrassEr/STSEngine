namespace STSEngine {

    export interface IWebSocketClientListService  {
        addWebSocketClient(client: any): IWebSocketClient;
        getWebSocketClientListIterator(): IterableIterator<IWebSocketClient>;

    }
}