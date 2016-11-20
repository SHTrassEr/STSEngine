/// <reference path="Client.ts" />

namespace STSEngine.Example {

    export class ClientActive extends Client implements IClientActive {

        protected attributeScoreId: number = ++this.lastAttributeId;

        public getScore(): number {
            return this.attributeList.get(this.attributeScoreId, 0);
        }

        public setScore(score: number): void {
            this.attributeList.set(this.attributeScoreId, score);
        }
    }

    export module ClientActive {
        export const type = ModuleInfo.name + '.' + ClientActive.name;
    }
}
