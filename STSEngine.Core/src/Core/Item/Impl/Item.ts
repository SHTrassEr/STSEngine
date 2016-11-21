/// <reference path="../../Entity/Impl/Entity.ts" />

namespace STSEngine.Core {

    export class Item extends Entity implements IItem {

    }

    export module Item {
        export const type = ModuleInfo.name + '.' + Item.name;
    }
}