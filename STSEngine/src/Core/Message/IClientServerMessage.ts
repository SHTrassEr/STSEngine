namespace STSEngine {

    export interface IClientServerMessage {
        messageType: number;
        attributeList: [number, any][];
    }
}