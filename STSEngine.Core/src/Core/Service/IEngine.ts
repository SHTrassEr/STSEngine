namespace STSEngine.Core {

    export interface IEngine {
        getWorld(): IWorld;
        getCommandListService(): ICommandListService;
        step(): void;
        getCommandList(): ICommand[];

        beforeStep(): ILiteEvent<IEngine>;
        afterStep(): ILiteEvent<IEngine>;
    }
}