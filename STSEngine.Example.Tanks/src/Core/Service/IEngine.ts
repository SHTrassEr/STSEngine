namespace STSEngine.Example.Tanks {;

    export interface IEngine extends Core.IEngine {
        getWorld(): IWorld;
        getCommandListService(): STSEngine.Core.ICommandListService;
        step(): void;
        getCommandList(): STSEngine.Core.ICommand[];

        beforePhysicsEngineStep(): STSEngine.Core.ILiteEvent<IEngine>;
        afterPhysicsEngineStep(): STSEngine.Core.ILiteEvent<IEngine>;

    }
}