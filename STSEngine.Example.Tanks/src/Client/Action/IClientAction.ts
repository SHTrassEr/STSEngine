namespace STSEngine.Example.Tanks {

    export interface IClientAction extends Core.IClientAction {

        setClientForce(itemId: number, up: boolean, right: boolean, down: boolean, left: boolean): void;
        fire(itemId: number, position: IVector);
        changeClientName(clientId: number, name: string): void;
        setClientForceVector(itemId: number, vector: IVector): void;
    }
}