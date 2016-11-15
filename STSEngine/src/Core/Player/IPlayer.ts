namespace STSEngine {

    export interface IPlayer extends IEntity {

        getName(): string;
        setName(name: string): void;
    }
}