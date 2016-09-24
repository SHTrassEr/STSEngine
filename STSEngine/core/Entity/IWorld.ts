﻿namespace STSEngine {

    export interface IWorld extends ICommitable {
        getSettings(): IWorldSettings;
        getObjectListService(): IObjectListService;
        getProcessListService(): IProcessListService;

        getProcessDispatcher(): IProcessDispatcher;
        getCommandDispatcher(): ICommandDispatcher;

        getStepNumber(): number;
        setStepNumber(stepNumber: number): void;
        increaseStepNumber(): void;
    }
}