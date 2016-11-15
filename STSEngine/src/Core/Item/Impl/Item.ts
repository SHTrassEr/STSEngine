/// <reference path="../../Entity/Impl/Entity.ts" />

namespace STSEngine {

    export class Item extends Entity implements IItem {
    
    }

    export module ItemType {

        let lastTypeId = 0;

        export function getNewTypeId(): number {
            return ++lastTypeId
        }
    }
}