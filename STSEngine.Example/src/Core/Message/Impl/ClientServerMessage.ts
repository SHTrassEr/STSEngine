namespace STSEngine.Example {

    export abstract class ClientServerMessage extends STSEngine.ClientServerMessage implements IClientServerMessage {

    }

    export module ClientServerMessage {
        export let LastTypeId = 0;
        export const Type = ++LastTypeId;
    }
}