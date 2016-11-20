/// <reference path="Command.ts" />

namespace STSEngine.Example {

    export class CommandInitWorld extends Command {

    }

    export module CommandInitWorld {
        export const type = ModuleInfo.name + '.' + CommandInitWorld.name;
    }
}
