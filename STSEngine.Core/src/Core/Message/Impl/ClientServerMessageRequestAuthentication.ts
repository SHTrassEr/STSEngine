/// <reference path="ClientServerMessage.ts" />

namespace STSEngine.Core {

    export class ClientServerMessageRequestAuthentication extends ClientServerMessage {

    }

    export module ClientServerMessageRequestAuthentication {
        export const type = ModuleInfo.name + '.' + ClientServerMessageRequestAuthentication.name;
    }
}