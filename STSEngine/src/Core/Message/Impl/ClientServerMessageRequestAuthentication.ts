/// <reference path="ClientServerMessage.ts" />

namespace STSEngine {

    export class ClientServerMessageRequestAuthentication extends ClientServerMessage {

    }

    export module ClientServerMessageRequestAuthentication {
        export const type = ModuleInfo.name + '.' + ClientServerMessageRequestAuthentication.name;
    }
}