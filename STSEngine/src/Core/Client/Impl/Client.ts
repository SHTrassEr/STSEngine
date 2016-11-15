/// <reference path="../../Entity/Impl/Entity.ts" />

namespace STSEngine {

    export class Client extends Entity implements IClient {

        protected attributeList: IAttributeList;

        protected attributeNameId: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
        }

        public getName(): string {
            return this.attributeList.get(this.attributeNameId);
        }

        public setName(name: string): void {
            this.attributeList.set(this.attributeNameId, name);
        }
    }

    export module ClientType {

        let lastTypeId = 0;

        export function getNewTypeId(): number {
            return ++lastTypeId
        }
    }
}