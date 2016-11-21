namespace STSEngine.Example.Tanks {;

    export interface IEngine extends Core.IEngine {
        getWorld(): IWorld;
        getCommandListService(): STSEngine.Core.ICommandListService;
        update(): void;
        getCommandList(): STSEngine.Core.ICommand[];

        beforePhysicsEngineUpdate(): STSEngine.Core.ILiteEvent<IEngine>;
        afterPhysicsEngineUpdate(): STSEngine.Core.ILiteEvent<IEngine>;

    }
}