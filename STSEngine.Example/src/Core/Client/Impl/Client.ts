namespace STSEngine.Example {

    export class Client extends STSEngine.Client implements IClient {

        protected attributeScoreId: number = ++this.lastAttributeId;

        public getScore(): number {
            return this.attributeList.get(this.attributeScoreId, 0);
        }

        public setScore(score: number): void {
            this.attributeList.set(this.attributeScoreId, score);
        }
    }
}