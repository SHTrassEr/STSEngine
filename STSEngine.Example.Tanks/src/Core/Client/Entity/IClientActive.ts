namespace STSEngine.Example.Tanks {

    export interface IClientActive extends Core.IClient {

        getScore(): number;
        setScore(score: number): void;
    }
}