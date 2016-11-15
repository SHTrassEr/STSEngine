namespace STSEngine.Example {

    export interface IClientActive extends STSEngine.IClient {

        getScore(): number;
        setScore(score: number): void;
    }
}