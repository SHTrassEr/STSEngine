namespace STSEngine.Example {

    export class Player extends STSEngine.Player implements IPlayer {

        protected attributeScoreId: number = ++this.lastAttributeId;

        public getScore(): number {
            return this.attributeList.get(this.attributeScoreId);
        }

        public setScore(score: number): void {
            this.attributeList.set(this.attributeScoreId, score);
        }
    }
}