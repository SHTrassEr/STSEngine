/// <reference path="Process.ts" />

namespace STSEngine.Example {

    export class ProcessFire extends Process {

        private _objectId: number = ++this.lastAttributeId;

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ProcessType.Fire);
        }

        public getObjectId(): number {
            return this.attributeList.get(this._objectId);
        }

        public setObjectId(id: number): void {
            this.attributeList.set(this._objectId, id);
        }

    }
}

namespace STSEngine {

    export module ProcessType {
        export const Fire = getNewTypeId();
    }
}