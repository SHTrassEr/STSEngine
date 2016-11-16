/// <reference path="../../Entity/Impl/Entity.ts" />

namespace STSEngine {

    export class ClientServerMessage extends Entity implements IClientServerMessage {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ClientServerMessage.Type);
        }
    }

    export module ClientServerMessage {
        export let LastTypeId = 0;
        export const Type = ++LastTypeId;
    }
}