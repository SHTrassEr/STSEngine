namespace STSEngine.Example {

    export interface IPlayer extends STSEngine.IPlayer {

        getScore(): number;
        setScore(score: number): void;
    }
}