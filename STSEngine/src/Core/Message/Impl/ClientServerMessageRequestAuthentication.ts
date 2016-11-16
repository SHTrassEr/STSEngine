/// <reference path="ClientServerMessage.ts" />

namespace STSEngine {

    export class ClientServerMessageRequestAuthentication extends ClientServerMessage {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ClientServerMessageRequestAuthentication.Type);
        }
    }

    export module ClientServerMessageRequestAuthentication {
        export const Type = ++ClientServerMessage.LastTypeId;
    }
}