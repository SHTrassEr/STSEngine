namespace STSEngine {

    export interface IWebSocketGameClient {
        start(): void;
        getWorld(): IWorld;
    }
}