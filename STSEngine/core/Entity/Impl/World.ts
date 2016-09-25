﻿namespace STSEngine {

    export class World implements IWorld {

        protected worldSettings: IWorldSettings;
        protected objectListService: IObjectListService;
        protected processListService: IProcessListService;
        protected processDispatcher: IProcessDispatcher;
        protected commandDispatcher: ICommandDispatcher;

        protected attributeList: IAttributeList;

        constructor(worldSettings: IWorldSettings) {
            this.objectListService = new ObjectListService();
            this.processListService = new ProcessListService();
            this.worldSettings = worldSettings;
            this.attributeList = new AttributeList();
            this.processDispatcher = new ProcessDispatcher();
            this.commandDispatcher = new CommandDispatcher();
            this.setStepNumber(0);
        }

        public getSettings(): IWorldSettings {
            return this.worldSettings;
        }

        public getObjectListService(): IObjectListService {
            return this.objectListService;
        }

        public getProcessListService(): IProcessListService {
            return this.processListService;
        }

        public getProcessDispatcher(): IProcessDispatcher {
            return this.processDispatcher;
        }

        public getCommandDispatcher(): ICommandDispatcher {
            return this.commandDispatcher;
        }

        public getStepNumber(): number {
            return this.attributeList.getAttribute(AttributeType.StepNumber);
        }

        public setStepNumber(stepNumber: number): void {
            this.attributeList.setAttribute(AttributeType.StepNumber, stepNumber);
        }

        public increaseStepNumber(): void {
            var stepNumber: number = this.getStepNumber() + 1;
            this.setStepNumber(stepNumber);
        }

        public commit(): void {
            this.objectListService.commit();
            this.processListService.commit();
            this.attributeList.commit();
        }

        public rollback(): void {
            this.objectListService.rollback();
            this.processListService.rollback();
            this.attributeList.rollback();
        }

        public isDirty(): boolean {
            return this.objectListService.isDirty() ||
                this.processListService.isDirty() ||
                this.attributeList.isDirty();
        }

    }
}