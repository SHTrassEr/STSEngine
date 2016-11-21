namespace STSEngine.Core {

    export interface IEngine {
        getWorld(): IWorld;
        getCommandListService(): ICommandListService;
        getStep(): number;

        update(): void;
        getCommandList(): ICommand[];

        beforeUpdate(): ILiteEvent<IEventEngine>;
        afterUpdate(): ILiteEvent<IEventEngine>;
    }
}