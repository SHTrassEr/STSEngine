/// <reference path="../../Entity/Impl/Entity.ts" />

namespace STSEngine {

    export abstract class ClientServerMessage extends Entity implements IClientServerMessage {

    }

    export module ClientServerMessageType {

        let lastTypeId = 0;

        export function getNewTypeId(): number {
            return ++lastTypeId
        }
    }
}