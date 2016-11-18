/// <reference path="Command.ts" />

namespace STSEngine.Example {

    export class CommandInitWorld extends Command {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            
            this.setType(CommandInitWorld.Type);
        }
    }

    export module CommandInitWorld {
        export const Type = ++Command.LastTypeId;
    }
}
