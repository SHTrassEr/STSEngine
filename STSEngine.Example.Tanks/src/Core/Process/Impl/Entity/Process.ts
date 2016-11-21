/// <reference path="../../../Entity/Impl/Entity.ts" />

namespace STSEngine.Example.Tanks {

    export abstract class Process extends Core.Process implements IProcess {

    }

    export module Process {
        export const type = ModuleInfo.name + '.' + Process.name;
    }
}