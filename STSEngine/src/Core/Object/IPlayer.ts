namespace STSEngine {

    export interface IPlayer extends IObject {

        getName(): string;
        setName(name: string): void;
    }
}