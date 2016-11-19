namespace STSEngine.Example {

    export interface IClientAction extends STSEngine.IClientAction {

        setClientForce(itemId: number, up: boolean, right: boolean, down: boolean, left: boolean): void;
        fire(itemId: number, position: IVector);
        changeClientName(clientId: number, name: string): void;
        setClientForceVector(itemId: number, vector: IVector): void;
    }
}