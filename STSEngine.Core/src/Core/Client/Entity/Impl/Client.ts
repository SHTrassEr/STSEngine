/// <reference path="../../../Entity/Impl/Entity.ts" />

namespace STSEngine.Core {

    export class Client extends Entity implements IClient {

        protected attributeList: IAttributeList;
        protected attributeNameId: number = ++this.lastAttributeId;


        public getName(): string {
            return this.attributeList.get(this.attributeNameId);
        }

        public setName(name: string): void {
            this.attributeList.set(this.attributeNameId, name);
        }
    }

    export module Client {
        export const type = ModuleInfo.name + '.' + Client.name;
    }
}