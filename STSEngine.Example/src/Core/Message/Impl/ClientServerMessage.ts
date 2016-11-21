/// <reference path="../../Entity/Impl/Entity.ts" />

namespace STSEngine.Example {

    export abstract class ClientServerMessage extends Core.ClientServerMessage implements IClientServerMessage {

    }

    export module ClientServerMessage {
        export const type = ModuleInfo.name + '.' + ClientServerMessage.name;
    }
}