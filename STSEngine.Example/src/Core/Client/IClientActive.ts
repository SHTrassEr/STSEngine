namespace STSEngine.Example {

    export interface IClientActive extends Core.IClient {

        getScore(): number;
        setScore(score: number): void;
    }
}