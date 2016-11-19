namespace STSEngine.Example {;

    export interface IEngine extends STSEngine.IEngine {
        getWorld(): IWorld;
        getCommandListService(): ICommandListService;
        step(): void;
        getCommandList(): ICommand[];

        beforePhysicsEngineStep(): ILiteEvent<IEngine>;
        afterPhysicsEngineStep(): ILiteEvent<IEngine>;

    }
}