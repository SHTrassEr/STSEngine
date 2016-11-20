/// <reference path="../../Entity/Impl/Entity.ts" />

namespace STSEngine.Example {

    export abstract class Client extends STSEngine.Client implements IClient {

    }

    export module Client {
        export const type = ModuleInfo.name + '.' + Client.name;
    }
}