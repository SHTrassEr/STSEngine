namespace STSEngine.Example {

    export interface IClient extends STSEngine.IClient {

        getScore(): number;
        setScore(score: number): void;
    }
}