namespace STSEngine.Example {

    export class ClientActive extends Client implements IClientActive {

        constructor(attributeList?: IAttributeList, kvpList?: Iterable<[number, any]>) {
            super(attributeList, kvpList);
            this.setType(ClientType.Active);
        }

        protected attributeScoreId: number = ++this.lastAttributeId;

        public getScore(): number {
            return this.attributeList.get(this.attributeScoreId, 0);
        }

        public setScore(score: number): void {
            this.attributeList.set(this.attributeScoreId, score);
        }
    }
}

namespace STSEngine {

    export module ClientType {
        export const Active = getNewTypeId();
    }
}