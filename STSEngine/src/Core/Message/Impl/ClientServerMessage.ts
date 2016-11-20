/// <reference path="../../Entity/Impl/Entity.ts" />

namespace STSEngine {

    export class ClientServerMessage extends Entity implements IClientServerMessage {

    }

    export module ClientServerMessage {
        export const type = ModuleInfo.name + '.' + ClientServerMessage.name;
    }
}