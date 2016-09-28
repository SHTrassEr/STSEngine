namespace STSEngine {

    export interface IEngine {
        getWorld(): IWorld;
        step(): void;
        getCommandList(): ICommand[];
    }
}