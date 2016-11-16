namespace STSEngine.Example {

    export interface IItemTank extends IItem {

        getClientForceVector(): [number, number];
        getClientForceVector(d: number): number;
        setClientForceVector(moveVector: [number, number]): void;

        getClientForceModifier(): number;
        setClientForceModifier(speed: number): void;
    }
}