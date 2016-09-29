/// <reference path="ObjectImpl.ts" />

namespace STSEngine {

    export class ObjectCommitable extends ObjectImpl implements ICommitable {

        protected attributeList: ICommitableAttributeList;

        constructor(attributeList: ICommitableAttributeList, kvpList?: IKeyValuePair[]) {
            super(attributeList, kvpList);
        }
        
        public rollback(): void {
            this.attributeList.rollback();
        }

        public commit(): void {
            this.attributeList.commit();
        }

        public isDirty(): boolean {
            return this.attributeList.isDirty();
        }
    }
}