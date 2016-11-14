namespace STSEngine {

    export interface IPlayer extends IObject {

        getName(): string;
        setName(name: string): void;

        getScore(): number;
        setScore(score: number): void;

    }
}